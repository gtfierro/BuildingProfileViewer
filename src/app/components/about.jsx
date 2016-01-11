var _ = require('lodash');
import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import Paper from 'material-ui/lib/paper';
import Menu from './menu';
import Divider from 'material-ui/lib/divider';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

const About = React.createClass({
    render() {
        return (
            <div style={{width: 1200, margin: "auto"}}>
                <Menu />
                <br />
                <Paper zdepth={2}>
                    <Card>
                        <CardText>
                        <h1>General Tags</h1>
                        Here, we describe how tags work, the basic taxonomy, the required expected tags and what they mean. This should be
                        considered more fundamental than the building profile tags, which will be discussed later.
                        </CardText>
                    </Card>
                    <br />
                    <Divider />
                    <Card>
                        <CardText>
                        <h2>Stream Metadata</h2>
                        <p>
                            The primary entity in the system is a stream, which is a sequence of <pre>(timestamp, value)</pre> pairs identified with a UUID and containing
                            a bag of key-value pairs, which we call the "metadata" of the stream.
                        </p>
                        <p>
                            Metadata keys are usually drawn from a set of known keys, which promotes interoperability between streams produced by different sources.
                            Key names are hierarchical, using forward slashes ("/") as the delimiters. Currently, there are 3 top-level "domains" of metadata, some
                            of which have additional "subdomains":
                        </p>
                        </CardText>
                    </Card>
                    
                </Paper>
            </div>
        );
    }
});

export default About;
