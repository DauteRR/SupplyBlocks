import React from 'react';
import { makeStyles, Theme, Typography } from '@material-ui/core';
import {
  VerticalTimeline,
  VerticalTimelineElement,
  VerticalTimelineElementProps
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { getEntityTypeData, VisibleEntityType } from '../../types';

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
    }
  },
  icon: {
    fontSize: 50
  },
  elementTitle: {
    marginBottom: theme.spacing(2)
  }
}));

const customStyles = (color: string) => {
  const customUseStyles = makeStyles(() => ({
    elementSideText: {
      color: color
    }
  }));
  const customClasses = customUseStyles();
  return customClasses;
};

interface TimeLineElement {
  type: VisibleEntityType;
  title: string;
  text: string;
}

const timelineElements: TimeLineElement[] = [
  {
    type: 'Factory',
    title: 'Lorem ipsum',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempus placerat leo, sed egestas libero malesuada at'
  },
  {
    type: 'Transport',
    title: 'Lorem ipsum',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempus placerat leo, sed egestas libero malesuada at'
  },
  {
    type: 'Warehouse',
    title: 'Lorem ipsum',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempus placerat leo, sed egestas libero malesuada at'
  },
  {
    type: 'Retailer',
    title: 'Lorem ipsum',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempus placerat leo, sed egestas libero malesuada at'
  }
];

const getTimelineElementProps = (
  type: VisibleEntityType,
  classes: Record<string, string>
): VerticalTimelineElementProps => {
  const data = getEntityTypeData(type, classes);

  const props: VerticalTimelineElementProps = {
    date: type as string,
    dateClassName: customStyles(data.color).elementSideText,
    iconStyle: {
      backgroundColor: data.color,
      color: 'white'
    },
    contentStyle: { backgroundColor: data.color, color: 'white' },
    contentArrowStyle: { borderRight: `7px solid  ${data.color}` },
    icon: data.icon
  };

  return props;
};

interface Props {}

export const WelcomeTimeline: React.FC<Props> = (props) => {
  const classes = useStyles();
  return (
    <VerticalTimeline className={classes.timeline}>
      {timelineElements.map((element, index) => (
        <VerticalTimelineElement
          key={index}
          {...getTimelineElementProps(element.type, classes)}
        >
          <Typography variant="h5" className={classes.elementTitle}>
            {element.title}
          </Typography>
          <Typography variant="subtitle2">{element.text}</Typography>
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  );
};

export default WelcomeTimeline;
