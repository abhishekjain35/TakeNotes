import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    borderRadius: "10px"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    //   borderBottom: "1px solid blue"
    marginTop: "10px"
  },
  pos: {
    marginBottom: 12,
    padding: "15px"
  },
});

export default function SimpleCard({title, content}) {
  const classes = useStyles();

  const [value, setValue] = useState(content);

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" className={classes.title} gutterBottom>
          {title}
        </Typography>
        <Typography className={classes.pos} component="p">
        <ReactQuill
            value={value}
            readOnly={true}
        />
        </Typography>
      </CardContent>
    </Card>
  );
}
