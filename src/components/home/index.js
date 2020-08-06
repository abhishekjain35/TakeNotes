import React from "react";
import SimpleCard from "./card";
import Grid from "@material-ui/core/Grid";

const HomeComponent = ({ data }) => {
    return (
        <div style={{ width: "90%", margin: "auto" }}>
            <Grid
                style={{ padding: "50px 0px" }}
                container
                justify="space-around"
                justify-xs="center"
                spacing={5}
            >
                {data.map((ele, index) => (
                    <Grid key={index} item xs={10} lg={3} md={5}>
                        <SimpleCard
                            title={ele.title}
                            content={ele.description}
                        ></SimpleCard>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default HomeComponent;
