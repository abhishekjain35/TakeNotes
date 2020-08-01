import React from "react";
import SimpleCard from "./card";
import Grid from "@material-ui/core/Grid";

const Home = () => {
    const testData = [
        {
            title: "An important card",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod vitae laudantium modi dolor? Aliquid quidem, animi ipsam officia sit soluta.",
        },
        {
            title: "An important card",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod vitae laudantium modi dolor? Aliquid quidem, animi ipsam officia sit soluta.",
        },
        {
            title: "An important card",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod vitae laudantium modi dolor? Aliquid quidem, animi ipsam officia sit soluta.",
        },
        {
            title: "An important card",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod vitae laudantium modi dolor? Aliquid quidem, animi ipsam officia sit soluta.",
        },
        {
            title: "An important card",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod vitae laudantium modi dolor? Aliquid quidem, animi ipsam officia sit soluta.",
        },
    ];

    return (
        <div style={{ width: "90%", margin: "auto" }}>
            <Grid
                style={{ padding: "50px 100px" }}
                container
                justify="space-around"
                justify-xs="center"
                spacing={6}
            >
                {testData.map((ele, index) => (
                    <Grid key={index} item xs={8} lg={3}>
                        <SimpleCard
                            title={ele.title}
                            content={ele.content}
                        ></SimpleCard>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Home;
