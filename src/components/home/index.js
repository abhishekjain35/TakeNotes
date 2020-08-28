import React from "react";
import SimpleCard from "./card";
import Grid from "@material-ui/core/Grid";

const HomeComponent = ({ data, onDelete }) => {
    return (
        <div style={{ width: "90%", margin: "auto" }}>
            <Grid
                style={{ padding: "50px 0px" }}
                container
                justify="center"
                justify-xs="center"
                spacing={5}
            >
                {data.map((ele, index) => (
                    <Grid key={index} item xs={11} lg={4} md={5}>
                        <SimpleCard
                            title={ele.data.title}
                            content={ele.data.description}
                            onDelete={onDelete}
                            id={ele.id}
                        ></SimpleCard>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default HomeComponent;
