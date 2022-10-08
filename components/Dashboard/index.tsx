import { Fragment, ReactNode, useState } from 'react';
import { Navbar, Center, Tooltip, UnstyledButton, Stack, AppShell } from '@mantine/core';
import {
    TablerIcon,
    IconHome2,
    IconGauge,
    IconDeviceDesktopAnalytics,
    IconFingerprint,
    IconCalendarStats,
    IconUser,
    IconSettings,
    IconLogout,
    IconSwitchHorizontal,
} from '@tabler/icons';
import useStyles from './styles';

interface NavbarLinkProps {
    icon: TablerIcon;
    label: string;
    active?: boolean;
    onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
    const { classes, cx } = useStyles();
    return (
        <Tooltip withArrow label={label} position="right" transitionDuration={0}>
            <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
                <Icon stroke={1.5} />
            </UnstyledButton>
        </Tooltip>
    );
}

const mockdata = [
    { icon: IconHome2, label: 'Home' },
    { icon: IconGauge, label: 'Dashboard' },
    { icon: IconDeviceDesktopAnalytics, label: 'Analytics' },
    { icon: IconCalendarStats, label: 'Releases' },
    { icon: IconUser, label: 'Account' },
    { icon: IconFingerprint, label: 'Security' },
    { icon: IconSettings, label: 'Settings' },
];

const Dashboard = ({ children }: {children: ReactNode}) => {
    const [active, setActive] = useState(2);

    const links = mockdata.map((link, index) => (
        <NavbarLink
            {...link}
            key={link.label}
            active={index === active}
            onClick={() => setActive(index)}
        />
    ));

    return (
        <AppShell
            navbar={
                <Navbar height="100vh" width={{ base: 80 }} p="md">
                    <Center>
                        LOGO
                    </Center>
                    <Navbar.Section grow mt={50}>
                        <Stack justify="center" spacing={0}>
                            {links}
                        </Stack>
                    </Navbar.Section>
                    <Navbar.Section>
                        <Stack justify="center" spacing={0}>
                            <NavbarLink icon={IconSwitchHorizontal} label="Change account" />
                            <NavbarLink icon={IconLogout} label="Logout" />
                        </Stack>
                    </Navbar.Section>
                </Navbar>
            }>
            {children}

        </AppShell>
    );
}

export default Dashboard;