import * as React from "react";

import {default as IPoint} from "../../../models/Point";
import PointItem from "./Item";
import PointForm from "./Form";

import {
    createStyles, Paper,
    Theme,
    withStyles,
    WithStyles
} from "@material-ui/core";
import EventEmitter from 'eventemitter3';
import * as cuid from "cuid";
import {LatLng} from "leaflet";
import {arrayMove, SortableContainer, SortableElement} from "react-sortable-hoc";

const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 4,
        paddingBottom: theme.spacing.unit * 2,
    },
});

interface IPointListProps extends WithStyles<typeof styles> {
    points: IPoint[],
    events: EventEmitter;
}

interface ISortableElementProps {
    point: any;
    events: EventEmitter
}

interface ISortableContainerProps  {
    items: IPoint[];
    events: EventEmitter;
}



const SortablePointItem = SortableElement<ISortableElementProps>(({point, events}) => <PointItem key={`point-${point.id}`} point={point} events={events} />);
const SortablePointsContainer = SortableContainer<ISortableContainerProps>(({items, events}) => {
    return (
        <div>
            {items.map((point:any, index: number) =>
                (
                    <SortablePointItem  key={`point-sortable-${point.id}`} index={index}  point={point} events={events} />
                )
            )}
        </div>
    )
});

class TaskList extends React.Component<IPointListProps> {

    public events = new EventEmitter();

    public state = {
        point: {
            id: cuid(),
            title: '',
            coordinates: new LatLng(0,0)
        } as IPoint,
        points: this.props.points
    };

    constructor(props: any){
        super(props);

        this.events = this.props.events || this.events;

        this.onSortEnd = this.onSortEnd.bind(this);
    }

    public componentWillReceiveProps(nextProps: any) {
        this.setState({
            points: nextProps.points
        });
    }


    public onSortEnd(newOrder:any){
        this.props.events.emit('reorder', arrayMove(this.state.points, newOrder.oldIndex, newOrder.newIndex));
    };

    public render() {
        return (
            <Paper elevation={1}>
                <PointForm point={this.state.point} events={this.events}/>
                <SortablePointsContainer
                    helperClass='sortableHelper'
                    items={this.props.points}
                    events={this.events}
                    onSortEnd={this.onSortEnd}
                    useDragHandle={true}
                />
            </Paper>
        );
    }
}



export default withStyles(styles)(TaskList);
