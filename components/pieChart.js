import { useEffect, useState } from "react";
// material-ui
import { useTheme } from "@mui/material/styles";
import { Grid, Typography, Chip } from "@mui/material";

// third-party
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

// chart options
const areaChartOptions = {
    chart: {
        height: 340,
        type: "donut",
        toolbar: {
            show: false,
        },
    },
    grid: {
        show: false, // you can either change hear to disable all grids
        xaxis: {
            lines: {
                show: false, //or just here to disable only x axis grids
            },
        },
        yaxis: {
            lines: {
                show: false, //or just here to disable only y axis
            },
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: "smooth",
        width: 1.5,
    },
    xaxis: {
        show: false,
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        show: false,
    },
};

// ==============================|| REPORT AREA CHART ||============================== //

const ReportAreaChart = () => {
    const theme = useTheme();

    const { primary, secondary } = theme.palette.text;
    const line = theme.palette.divider;

    const [options, setOptions] = useState(areaChartOptions);

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: [theme.palette.primary.main, theme.palette.warning.main],
            xaxis: {
                labels: {
                    style: {
                        colors: secondary,
                    },
                },
            },
            tooltip: {
                theme: theme.palette.mode === "light" ? "light" : "dark",
            },
            legend: {
                position: "top",
                horizontalAlign: "top",
                labels: {
                    colors: "text.primary",
                },
            },
            noData: {
                text: "Loading insights...",
                align: 'center',
                verticalAlign: 'middle',
                offsetX: 0,
                offsetY: 0,
                style: {
                    color: "#94a3b8",
                    fontSize: '14px',
                    fontFamily: "Fira-Sans + Ubuntu"
                }
            }
        }));
    }, [primary, secondary, line, theme]);

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography>Transactions Category</Typography>
                        </Grid>
                       
                    </Grid>
                </Grid>
            </Grid>
            <ReactApexChart
                options={options}
                series={[500, 600]}
                type="donut"
                height={200}
            />
        </>
    );
};

export default ReportAreaChart;