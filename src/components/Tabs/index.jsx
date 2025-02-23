import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { p } from "motion/react-client";

const TabsComponent = ({ tabs, selectedTab, onTabChange }) => {
    return (
        <Box sx={{ flexGrow: 1, display: 'flex', height: '100%', p: 5, borderRadius: '0.5rem' }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={selectedTab}
                onChange={onTabChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 'none', }}
            >
                {tabs.map((tab) => (

                    <Tab key={tab.value} value={tab.value} label={tab.label}
                        sx={{
                            fontSize: "1rem", // 2rem tương đương text-4xl của Tailwind
                            fontWeight: "bold",
                            color: "rgb(26,88,222)",
                            textTransform: "capitalize",
                            "&:hover": {
                                backgroundColor: "rgb(26,88,222)",
                                color: "white",
                            },
                            "&.Mui-selected": {
                                backgroundColor: "rgb(26,88,222)",
                                color: "white",
                            },
                        }}
                    />
                ))}
            </Tabs>
            <Box sx={{ mt: 2, ml: 2, flexGrow: 1 }}>
                {tabs.find((tab) => tab.value === selectedTab)?.content}
            </Box>
        </Box>
    );
};

export default TabsComponent;
