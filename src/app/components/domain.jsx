var _ = require('lodash');
import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import Divider from 'material-ui/lib/divider';

const TagDomain = React.createClass({
    render() {
        return (
            <Card>
                <CardHeader title="Test" />
                <Divider />
                <CardText>
                    <h3>stuff</h3>
                </CardText>
            </Card>
        );

    }
});

const DOMAIN_DATA = [
    {
        "exhaustive": true,
        "values": [
            "s",
            "ms",
            "us",
            "ns"
        ],
        "id": "c677c8f6-b411-11e5-8769-0cc47a0f7eea",
        "mapping": {
            "s": "seconds",
            "ns": "nanoseconds",
            "ms": "milliseconds",
            "us": "microseconds"
        }
    },
    {
        "exhaustive": true,
        "values": [
            "numeric",
            "object"
        ],
        "id": "25fc8d20-b412-11e5-8769-0cc47a0f7eea"
    },
    {
        "exhaustive": false,
        "id": "85ed1664-b412-11e5-8769-0cc47a0f7eea",
        "reference": "https://en.wikipedia.org/wiki/List_of_time_zone_abbreviations"
    },
    {
        "exhaustive": true,
        "values": [
            "North",
            "South",
            "East",
            "West",
            "Northeast",
            "Northwest",
            "Southeast",
            "Southwest"
        ],
        "id": "cd6aa1d6-b413-11e5-8769-0cc47a0f7eea"
    },
    {
        "exhaustive": true,
        "values": [
            "Sensor",
            "State",
            "Setpoint",
            "Command"
        ],
        "id": "6a8e4670-b414-11e5-8769-0cc47a0f7eea",
        "mapping": {
            "Sensor": "A read-only transducer that reflects some aspect of the physical world.",
            "State": "The read-only state of some aspect of a device",
            "Command": "A writable setting of a device that immediately affects its state",
            "Setpoint": "A writable setting of a device that serves to direct or influence the device"
        }
    },
    {
        "exhaustive": false,
        "values": [
            "Occupancy",
            "Humidity",
            "Temperature",
            "Illumination",
            "CO2"
        ],
        "id": "47857292-b415-11e5-8769-0cc47a0f7eea",
        "mapping": {
            "CO2": "carbon dioxide"
        }
    }
]

export default TagDomain;
