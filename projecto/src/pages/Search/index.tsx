import React from "react";
import { useContentStore, type SearchResultItem } from "@stores/useContentStore";
import { AlbumCard, TrackCard } from "@components/Card/Card";
import { useNavigate } from "react-router";
import { usePlayerStore } from "@stores/usePlayerStore";

import classes from "./index.module.css";


interface SearchCardProps { asf: SearchResultItem }

const SearchCard = (props: SearchCardProps) => {
    const navigate = useNavigate();
    const playTrack = usePlayerStore(s => s.setCurrentTrack);
    const playAlbum = usePlayerStore(s => s.setQueue);


    const { asf: e } = props;


    if (e.type === "track") {
        const t = e.item;

        return (
            <TrackCard
                key={t.id}
                title={t.title}
                artistIds={t.artist_ids}
                artSrc={t.artwork}

                onPlayClick={() => playTrack(t.id)}
                onTitleClick={() => navigate(`/tracks/${t.id}`)}
            />
        );
    }

    const a = e.item;
    return (
        <AlbumCard
            key={a.id}
            artSrc={a.artwork}
            title={a.name}
            artistIds={a.artist_ids}

            onTitleClick={() => navigate(`/albums/${a.id}`)}
            onPlayClick={() => playAlbum(a.track_ids)}
        />
    );
};


const SearchPage = () => {
    const search = useContentStore(s => s.search);
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const [ result, setResult ] = React.useState<SearchResultItem[]>([]);

    const onSearch = () => {
        if (!inputRef.current) return;
        const sr = search(inputRef.current.value);
        setResult(sr);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => onSearch(), []);

    return (
        <>
            <input type="text" ref={inputRef} onInput={() => onSearch()} className={classes.sb} placeholder="Search" />
            {result.length > 0 && <div className={classes.sr}>
                {result.map((e, i) => <SearchCard asf={e} key={i} />)}
            </div>}
        </>
    );
};

export default SearchPage;
