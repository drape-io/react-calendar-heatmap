import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';

function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

function getRange(count) {
  const arr = [];
  for (let idx = 0; idx < count; idx += 1) {
    arr.push(idx);
  }
  return arr;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomValues(count, date = new Date()) {
  return getRange(count).map((index) => {
    return {
      date: shiftDate(date, -index),
      count: getRandomInt(1, 3),
    };
  });
}

class Demo extends React.Component {
  state = {
    values: generateRandomValues(200),
  };

  generateValues = () => {
    this.setState({
      values: generateRandomValues(200),
    });
  };

    getTooltipDataAttrs = (value) => {
        // Temporary hack around null value.date issue
        if (!value || !value.date) {
            return null;
        }
        // Configuration for react-tooltip
        return {
            'data-tip': `${value.date.toISOString().slice(0, 10)} has count: ${value.count}`,
        };
    };
    getTooltipDataAttrs2 = (value) => {
        // Temporary hack around null value.date issue
        if (!value || !value.date) {
            return null;
        }
        // Configuration for react-tooltip
        return {
            'data-tip': `${new Date(value.date).toISOString().slice(0, 10)} has count: ${value.count}`,
        };
    };
    handleClick = (value) => {
        alert(`You clicked on ${value.date.toISOString().slice(0, 10)} with count: ${value.count}`);
    };
    handleClick2 = (value) => {
        alert(`You clicked on ${new Date(value.date).toISOString().slice(0, 10)} with count: ${value.count}`);
    };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-12 col-sm-6">
            <CalendarHeatmap
              values={this.state.values}
              classForValue={(value) => {
                if (!value) {
                  return 'color-empty';
                }
                return `color-github-${value.count}`;
              }}
              tooltipDataAttrs={this.getTooltipDataAttrs}
              onClick={this.handleClick}
            />
          </div>
          <div className="col-12 col-sm-6">
            <CalendarHeatmap
        startDate={new Date('2016-01-01')}
        endDate={new Date('2016-06-30')}
        values={[
            { date: '2016-01-01', count: 8 },
            { date: '2016-01-02', count: 8 },
            { date: '2016-01-22', count: 6 },
            { date: '2016-01-30', count: 4 },
        ]}
              classForValue={(value) => {
                if (!value) {
                  return 'color-empty';
                }
                return `color-gitlab-${value.count}`;
              }}
              tooltipDataAttrs={this.getTooltipDataAttrs2}
              onClick={this.handleClick2}
            />
          </div>
        </div>{' '}
        <div className="text-sm-center mt-4">
          <button className="btn btn-link btn-sm text-secondary" onClick={this.generateValues}>
            Regenerate values
          </button>
        </div>
        <ReactTooltip />
      </div>
    );
  }
}

export default Demo;
