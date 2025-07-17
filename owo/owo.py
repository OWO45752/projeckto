import csv
from dataclasses import dataclass
import os
import shutil
from typing import Optional
from pathlib import Path
import json



#region CONSTANTS

TRACKS_FILE = "tracks.csv"
ALBUMS_FILE = "albums.csv"

OUTPUT_ROOT_PATH = str(Path("./output").resolve())

DATA_ROOT_PATH = str(Path("./data_src").resolve())
ARTWORK_DIR_NAME = "ARTWORK"
AUDIO_DIR_NAME = "AUDIO"
ALBUM_DIR_NAME = "ALBUM"

#endregion CONSTANTS



#region FUNCKS UND CLASSESE

class Log:
    COLORS = {
        "info": "\033[94m",
        "warn": "\033[93m",
        "error": "\033[91m",
        "success": "\033[92m",
        "debug": "\033[95m",
        "reset": "\033[0m",
    }

    @staticmethod
    def info(*values: object, sep: Optional[str] = " ", end: Optional[str] = "\n") -> None:
        print(Log.COLORS["info"] + "[INFO]" + Log.COLORS["reset"], *values, sep=sep, end=end)

    @staticmethod
    def warn(*values: object, sep: Optional[str] = " ", end: Optional[str] = "\n") -> None:
        print(Log.COLORS["warn"] + "[WARN]" + Log.COLORS["reset"], *values, sep=sep, end=end)

    @staticmethod
    def error(*values: object, sep: Optional[str] = " ", end: Optional[str] = "\n") -> None:
        print(Log.COLORS["error"] + "[ERROR]" + Log.COLORS["reset"], *values, sep=sep, end=end)

    @staticmethod
    def success(*values: object, sep: Optional[str] = " ", end: Optional[str] = "\n") -> None:
        print(Log.COLORS["success"] + "[OK]" + Log.COLORS["reset"], *values, sep=sep, end=end)

    @staticmethod
    def debug(*values: object, sep: Optional[str] = " ", end: Optional[str] = "\n") -> None:
        print(Log.COLORS["debug"] + "[DEBUG]" + Log.COLORS["reset"], *values, sep=sep, end=end)




def _resolve_path(base_dir: str, *target_path: str, strict:bool = True) -> str:
    base = Path(base_dir).resolve(strict=strict)
    
    cleaned_parts = [p.lstrip("/\\") for p in target_path if p.strip() != ""]
    target = (base / Path(*cleaned_parts)).resolve(strict=False)

    if not str(target).startswith(str(base)):
        raise ValueError("Access outside of base directory is not allowed")

    return str(target)

def resolve_data_path(*paths: str, strict: bool = True) -> str:
    return _resolve_path(DATA_ROOT_PATH, *paths, strict=strict)

def resolve_output_path(*paths: str, strict: bool = True) -> str:
    return _resolve_path(OUTPUT_ROOT_PATH, *paths, strict=strict)



def ensure_dir(path: str) -> None:
    Path(path).mkdir(parents=True, exist_ok=True)



@dataclass(frozen=True)
class Artist:
    id: str
    name: str

@dataclass(frozen=True)
class Album:
    id: str
    name: str
    artists_id: list[str]
    art_file_path: str

@dataclass(frozen=True)
class Track:
    id: str
    title: str
    artist_ids: list[str]
    genres: list[str]
    duration: int
    album_id: Optional[str]
    audio_file_path: str
    art_file_path: str

class ArtistList:
    def __init__(self) -> None:
        self._artists: list[Artist] = []
        self._by_id: dict[str, Artist] = {}
        self._by_name: dict[str, Artist] = {}
    
    def get_length(self) -> int:
        return len(self._artists)

    def add(self, artist: Artist) -> None:
        if artist.id in self._by_id:
            return
        self._artists.append(artist)
        self._by_id[artist.id] = artist
        self._by_name[artist.name.lower()] = artist

    def get_by_id(self, artist_id: str) -> Optional[Artist]:
        return self._by_id.get(artist_id)

    def get_by_name(self, name: str) -> Optional[Artist]:
        return self._by_name.get(name.lower())

    def all(self) -> list[Artist]:
        return list(self._artists)


class AlbumList:
    def __init__(self) -> None:
        self._albums: list[Album] = []
        self._by_id: dict[str, Album] = {}
        self._by_name: dict[str, Album] = {}

    def add(self, album: Album) -> None:
        if album.id in self._by_id:
            return
        self._albums.append(album)
        self._by_id[album.id] = album
        self._by_name[album.name.lower()] = album

    def get_by_id(self, album_id: str) -> Optional[Album]:
        return self._by_id.get(album_id)

    def get_by_name(self, name: str) -> Optional[Album]:
        return self._by_name.get(name.lower())

    def get_by_artist(self, artist: Artist) -> list[Album]:
        return [album for album in self._albums if artist.id in album.artists_id]

    def all(self) -> list[Album]:
        return list(self._albums)
    
    def __repr__(self) -> str:
        return f"<AlbumList {self._albums}>"


class TrackList:
    def __init__(self) -> None:
        self._tracks: list[Track] = []
        self._by_id: dict[str, Track] = {}
        self._by_title: dict[str, Track] = {}

    def add(self, track: Track) -> None:
        if track.id in self._by_id:
            return
        self._tracks.append(track)
        self._by_id[track.id] = track
        self._by_title[track.title.lower()] = track

    def get_by_id(self, track_id: str) -> Optional[Track]:
        return self._by_id.get(track_id)

    def get_by_title(self, title: str) -> Optional[Track]:
        return self._by_title.get(title.lower())

    def get_by_artist(self, artist: Artist) -> list[Track]:
        return [track for track in self._tracks if artist.id in track.artist_ids]

    def get_by_album(self, album: Album) -> list[Track]:
        return [track for track in self._tracks if track.album_id == album.id]

    def all(self) -> list[Track]:
        return list(self._tracks)



def _path_to_url(root: str, full_path: str, url_root: str = "") -> str:
    """
    Convert absolute file path to absolute URL path relative to a root.
    
    Example:
    - root: "C:\\owo\\awa"
    - full_path: "C:\\owo\\awa\\oof\\kwoski"
    - url_root: "/owo"
    - returns: "/owo/oof/kwoski"
    """
    # Normalize paths to avoid case and separator issues
    root = os.path.normpath(root)
    full_path = os.path.normpath(full_path)

    # Check if full_path starts with root
    if not os.path.commonpath([root, full_path]) == root:
        raise ValueError("Full path is not within the root path")

    # Get the relative path and convert to URL style
    rel_path = rel_path = os.path.relpath(full_path, root).replace("\\", "/")

    # Normalize and join the url_root and relative path
    if url_root:
        if not url_root.startswith("/"):
            url_root = "/" + url_root
        url_path = os.path.join(url_root, rel_path).replace("\\", "/")
    else:
        url_path = "/" + rel_path

    return url_path

def path_to_url(path: str, url_root: str = "") -> str:
    return _path_to_url(DATA_ROOT_PATH, path, url_root)

#endregion FUNCKS UND CLASSESE



#region DATA DIVISION

DATA_ARTIST_LIST = ArtistList()
DATA_ALBUM_LIST = AlbumList()
DATA_TRACK_LIST = TrackList()

ensure_dir(DATA_ROOT_PATH)
ensure_dir(OUTPUT_ROOT_PATH)

#endregion DATA DIVISION



#region Parseng

def parseng_prc_artist(artists_str: str) -> list[Artist]:
    artists = [a.strip() for a in artists_str.split(",")]
    artist_instances: list[Artist] = []

    for artist_name in artists:
        artist_name = artist_name.strip()
        if artist_name == "":
            continue

        artist_inst = DATA_ARTIST_LIST.get_by_name(artist_name)
        if not artist_inst:
            aid = DATA_ARTIST_LIST.get_length()
            artist_inst = Artist(f"{aid + 1}", artist_name)
            DATA_ARTIST_LIST.add(artist_inst)
        artist_instances.append(artist_inst)
    return artist_instances



if not os.path.exists(DATA_ROOT_PATH):
    raise OSError(f"Data Root Path: {DATA_ROOT_PATH} not exist")

if not os.path.exists(TRACKS_FILE):
    raise OSError(f"Track file: {TRACKS_FILE} not exist")

if os.path.exists(ALBUMS_FILE):
    with open(ALBUMS_FILE, mode="r", encoding="utf-8") as file:
        csv_reader = csv.DictReader(file)
        
        for row in csv_reader:
            aid = row["ALBUM_ID"].strip()
            name = row["ALBUM_NAME"].strip()
            artist_instances = parseng_prc_artist(row["ARTISTS"])

            ovrd_art_file = row["OVRD_ART_FILE"].strip()
            ovrd_art_file = None if ovrd_art_file == "" else ovrd_art_file

            artfile = resolve_data_path(ALBUM_DIR_NAME, f"{aid}.webp")
            if ovrd_art_file is not None:
                artfile = resolve_data_path(ovrd_art_file)
            
            if not os.path.exists(artfile):
                raise OSError(f"Artfile for album {name} not exists: {artfile}")
            
            album_inst = Album(aid, name, [x.id for x in artist_instances], artfile)
            DATA_ALBUM_LIST.add(album_inst)
else:
    Log.info("Album file", ALBUMS_FILE, "not exist. Skipping")



with open(TRACKS_FILE, mode="r", encoding="utf-8") as file:
    csv_reader = csv.DictReader(file)
    for row in csv_reader:
        tid = row["TRACK_ID"].strip()
        title = row["TITLE"].strip()

        artist_instances = parseng_prc_artist(row["ARTISTS"])

        genres = [x.strip() for x in row["GENRES"].split(",")]
        duration = int(row["DURATION_MS"])
        album_id = row["ALBUM_ID"].strip()
        if album_id.startswith("id:"):
            album_id = album_id.lstrip("id:").strip()
        if album_id == "":
            album_id = None

        ovrd_audio_file = row["OVRD_AUDIO_FILE"].strip()
        ovrd_audio_file = None if ovrd_audio_file == "" else ovrd_audio_file

        ovrd_art_file = row["OVRD_ART_FILE"].strip()
        ovrd_art_file = None if ovrd_art_file == "" else ovrd_art_file
        
        audiofile = resolve_data_path(AUDIO_DIR_NAME, f"{tid}.ogg")
        if ovrd_audio_file is not None:
                audiofile = resolve_data_path(ovrd_audio_file)
        if not os.path.exists(audiofile):
            raise OSError(f"Audiofile for track {title} not exists: {audiofile}")

        artfile = resolve_data_path(ARTWORK_DIR_NAME, f"{tid}.webp")
        if ovrd_art_file is not None:
                artfile = resolve_data_path(ovrd_art_file)
        if not os.path.exists(artfile):
            raise OSError(f"Artfile for track {title} not exists: {artfile}")
        
        track_inst = Track(tid, title, [x.id for x in artist_instances], genres, duration, album_id, audiofile, artfile)
        DATA_TRACK_LIST.add(track_inst)

#endregion Parseng



#region Prozesseng

#TODO: Gen dir structures, Gen JSON, Copy media

NG_BASE_OUTPUT_PATH = resolve_output_path("api", strict=False)
NG_AUDIO_OUTPUT_PATH = resolve_output_path("api", AUDIO_DIR_NAME)
NG_ARTWORK_OUTPUT_PATH = resolve_output_path("api", ARTWORK_DIR_NAME)

ensure_dir(NG_BASE_OUTPUT_PATH)
ensure_dir(NG_AUDIO_OUTPUT_PATH)
ensure_dir(NG_ARTWORK_OUTPUT_PATH)



data = { # type: ignore
    "tracks": {},
    "albums": {},
    "artists": {},
    "v_featured": [],
    "v_discover": [],
}

for x in DATA_TRACK_LIST.all():
    xdata = { # type: ignore
        "id": x.id,
        "title": x.title,
        "artist_ids": x.artist_ids,
        "genres": x.genres,
        "duration_ms": x.duration,
        "stream": path_to_url(x.audio_file_path, "/api/"),
        "artwork": path_to_url(x.art_file_path, "/api/")
    }

    data["tracks"][x.id] = xdata

for x in DATA_ALBUM_LIST.all():
    xtracks: list[str] = []
    for xj in DATA_TRACK_LIST.get_by_album(x):
        xtracks.append(xj.id)


    xdata = { # type: ignore
        "id": x.id,
        "name": x.name,
        "artist_ids": x.artists_id,
        "artwork": path_to_url(x.art_file_path, "/api/"),
        "track_ids": xtracks
    }

    data["albums"][x.id] = xdata

for x in DATA_ARTIST_LIST.all():
    xalbums: list[str] = []
    for xf in DATA_ALBUM_LIST.get_by_artist(x):
        xalbums.append(xf.id)

    xtracks: list[str] = []
    for xj in DATA_TRACK_LIST.get_by_artist(x):
        xtracks.append(xj.id)

    xdata = { # type: ignore
        "id": x.id,
        "name": x.name,
        "album_ids": xalbums,
        "track_ids": xtracks,
    }

    data["artists"][x.id] = xdata



for r in range(1, 10):
    x = DATA_TRACK_LIST.get_by_id(str(r))
    if x:
        data["v_featured"].append(x.id) # type: ignore

atrack = DATA_TRACK_LIST.all()
atrack.reverse()
for x in atrack:
    data["v_discover"].append(x.id) # type: ignore



with open(resolve_output_path("api", "index.json"), mode="w", encoding="utf-8") as file:
    # json.dump(data, file, indent=4)
    json.dump(data, file)



shutil.copytree(resolve_data_path(AUDIO_DIR_NAME), NG_AUDIO_OUTPUT_PATH, dirs_exist_ok=True)
shutil.copytree(resolve_data_path(ARTWORK_DIR_NAME), NG_ARTWORK_OUTPUT_PATH, dirs_exist_ok=True)

#endregion Prozesseng
