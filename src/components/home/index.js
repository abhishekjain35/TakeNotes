import React from "react";
import SimpleCard from "./card";
import Grid from "@material-ui/core/Grid";

const HomeComponent = ({ data, onDelete, handlePin }) => {
    let hasPinnedItems = data && data.pinnedItems && data.pinnedItems.length > 0;
    return (
        <div style={{ width: "90%", margin: "auto" }}>
            {hasPinnedItems && (
                <>
                    <h4 style={{ textAlign: "center" }}>PINNED</h4>
                    <Grid
                        style={{ padding: "10px 0 50px 0" }}
                        container
                        justify="center"
                        justify-xs="center"
                        spacing={5}
                    >
                        {data.pinnedItems.map((ele, index) => (
                            <Grid key={index} item xs={11} lg={4} md={5}>
                                <SimpleCard
                                    title={ele.data.title}
                                    content={ele.data.description}
                                    onDelete={onDelete}
                                    id={ele.id}
                                    handlePin={handlePin}
                                    pinned={true}
                                ></SimpleCard>
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
            {hasPinnedItems && <h4 style={{ textAlign: "center" }}>OTHERS</h4>}
            <Grid
                style={{ padding: "50px 0px" }}
                container
                justify="center"
                justify-xs="center"
                spacing={5}
            >
                {data.normalItems && data.normalItems.map((ele, index) => (
                    <Grid key={index} item xs={11} lg={4} md={5}>
                        <SimpleCard
                            title={ele.data.title}
                            content={ele.data.description}
                            onDelete={onDelete}
                            id={ele.id}
                            handlePin={handlePin}
                            pinned={false}
                        ></SimpleCard>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default HomeComponent;
