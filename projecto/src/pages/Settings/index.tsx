import React from "react";

import { useApplicationStore } from "@stores/useApplicationStore";

import { Text } from "@components/Text";
import SettingBarButton from "./SettingBarButton";
import { IconColorFilter } from "@tabler/icons-react";

const SettingsPage = () => {
    const cycleTheme = useApplicationStore(s => s.cycleTheme);


    return (
        <>
            <Text as="h1" bold>Settings</Text>
            <Text as="h3" bold>Appearance</Text>

            <SettingBarButton
                icon={IconColorFilter}
                text="Theme"
                onClick={() => cycleTheme()}
            />
        </>
    );
};

export default SettingsPage;
