// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import React from "react";

import { useApplicationStore } from "@stores/useApplicationStore";

import { Text } from "@components/Text";
import SettingBarButton from "./SettingBarButton";
import { IconColorFilter } from "@tabler/icons-react";

const SettingsPage = () => {
    const cycleTheme = useApplicationStore(s => s.cycleTheme);
    const currentTheme = useApplicationStore(s => s.currentTheme);


    return (
        <>
            <Text as="h1" bold>Settings</Text>
            <Text as="h3" bold>Appearance</Text>

            <SettingBarButton
                icon={IconColorFilter}
                text={`Cycle Theme (Current theme: ${currentTheme})`}
                onClick={() => cycleTheme()}
            />
        </>
    );
};

export default SettingsPage;
