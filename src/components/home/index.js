import React from "react";
import SimpleCard from "./card";
import Grid from "@material-ui/core/Grid";
import SearchBar from "./search";

const HomeComponent = ({
  data,
  onDelete,
  handlePin,
  show,
  searchResults,
  children,
}) => {
  let hasPinnedItems = data && data.pinnedItems && data.pinnedItems.length > 0;
  return (
    <div style={{ width: "90%", margin: "auto" }}>
      {children}
      {show && hasPinnedItems && (
        <>
          <h5>PINNED</h5>
          <Grid
            style={{ padding: "10px 0 50px 0" }}
            container
            justify="flex-start"
            justify-xs="center"
            spacing={5}
          >
            {data.pinnedItems.map((ele) => (
              <Grid key={ele.id} item xs={11} lg={4} md={5}>
                <SimpleCard
                  title={ele.data.title}
                  content={ele.data.description}
                  onDelete={onDelete}
                  id={ele.id}
                  handlePin={handlePin}
                  pinned={true}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
      {show && hasPinnedItems && <h5>OTHERS</h5>}
      {show && (
        <Grid
          style={{ padding: "10px 0 50px 0" }}
          container
          justify="flex-start"
          justify-xs="center"
          spacing={5}
        >
          {data.normalItems &&
            data.normalItems.map((ele, index) => (
              <Grid key={ele.id} item xs={11} lg={4} md={5}>
                <SimpleCard
                  title={ele.data.title}
                  content={ele.data.description}
                  onDelete={onDelete}
                  id={ele.id}
                  handlePin={handlePin}
                  pinned={false}
                />
              </Grid>
            ))}
        </Grid>
      )}
      {!show && searchResults.length ? (
        <Grid
          style={{ padding: "10px 0 50px 0" }}
          container
          justify="flex-start"
          justify-xs="center"
          spacing={5}
        >
          {searchResults.map((ele, index) => (
            <Grid key={ele.id} item xs={11} lg={4} md={5}>
              <SimpleCard
                title={ele.data.title}
                content={ele.data.description}
                onDelete={onDelete}
                id={ele.id}
                handlePin={handlePin}
                pinned={false}
              />
            </Grid>
          ))}
        </Grid>
      ): null}
    </div>
  );
};

export default HomeComponent;
