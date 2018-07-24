import * as React from "react";
import {default as IPoint} from "../../../models/Point";
import {
    IconButton, ListItem, ListItemText,
    Theme,
    WithStyles,
    withStyles
} from "@material-ui/core";
import { createStyles } from '@material-ui/core';
import {CompareArrows, Delete} from "@material-ui/icons";
import EventEmitter from 'eventemitter3';
import {SortableHandle} from "react-sortable-hoc";


const styles = (theme: Theme) => createStyles({
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    heading: {
        marginTop: 15,
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightLight,
    },
    warning:{
        color:'#ffb122'
    },
    expired: {
        color:'#ff4617'
    },
    resolved: {
        color:'#00bb0d'
    },
    delete: {
        color:'#ff4617'
    }
});
const DragHandle = SortableHandle(() => <IconButton aria-label="Move" disableRipple={true}>
    <CompareArrows />
</IconButton>); // This can be any component you want


interface IPointItemProps extends WithStyles<typeof styles> {
    point: IPoint
    events: EventEmitter
}


class PointItem extends React.Component<IPointItemProps> {

    constructor(props: any){
        super(props);
        this.remove = this.remove.bind(this);
    }

    public remove(){
        this.props.events.emit('remove', this.props.point);
    }


    public render() {

        return (
            <ListItem>
                <ListItemText
                    primary={this.props.point.title}
                    secondary={'Coordinates: ' + this.props.point.coordinates.lat + ' ' + this.props.point.coordinates.lng}/>
                <IconButton aria-label="Delete" onClick={this.remove}>
                    <Delete className={this.props.classes.delete} />
                </IconButton>
                <DragHandle />
            </ListItem>

        );
    }
};

export default withStyles(styles)(PointItem);

