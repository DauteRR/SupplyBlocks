import { makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement,
  VerticalTimelineElementProps
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  timeline: {
    margin: theme.spacing(6, 0),
    '&::before': {
      background: 'black'
    },
    '& .vertical-timeline-element-icon': {
      boxShadow: `0 0 0 4px black, inset 0 2px 0 rgba(0, 0, 0, 0.08), 0 3px 0 4px rgba(0, 0, 0, 0.05)`
    },
    '& .vertical-timeline-element-content .vertical-timeline-element-date': {
      fontWeight: 600,
      fontSize: 28,
      padding: 0
    },
    '& .vertical-timeline-element-content': {
      boxShadow:
        '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
    }
  },
  elementTitle: {
    marginBottom: theme.spacing(2)
  }
}));

export interface TimelineElement
  extends Omit<VerticalTimelineElementProps, 'date'> {
  label: string;
  title: string;
  text: string;
}

interface Props {
  elements: TimelineElement[];
}

export const Timeline: React.FC<Props> = (props) => {
  const classes = useStyles();
  return (
    <VerticalTimeline className={classes.timeline}>
      {props.elements.map((element, index) => {
        const { label, title, text, ...rest } = element;
        return (
          <VerticalTimelineElement key={index} date={label} {...rest}>
            <Typography variant="h5" className={classes.elementTitle}>
              {title}
            </Typography>
            <Typography variant="subtitle1">{text}</Typography>
          </VerticalTimelineElement>
        );
      })}
    </VerticalTimeline>
  );
};

export default Timeline;
