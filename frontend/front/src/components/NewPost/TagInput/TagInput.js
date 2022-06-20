import React from 'react';
var ReactTags = require('react-tag-input').WithContext;

class TagInput extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            tags: ["Banana", "Mango", "Pear", "Apricot"]
        }
      }
    getInitialState =()=> {
        return {
            tags: [ {id: 1, text: "Apples"} ],
            suggestions: ["Banana", "Mango", "Pear", "Apricot"]
        }
    };
    handleDelete =(i)=> {
        var tags = this.state.tags;
        tags.splice(i, 1);
        this.setState({tags: tags});
    };
    handleAddition =(tag)=> {
        var tags = this.state.tags;
        tags.push({
            id: tags.length + 1,
            text: tag
        });
        this.setState({tags: tags});
    };
    handleDrag =(tag, currPos, newPos)=> {
        var tags = this.state.tags;

        // mutate array
        tags.splice(currPos, 1);
        tags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: tags });
    };
    render() {
        var tags = this.state.tags;
        var suggestions = this.state.suggestions;
        return (
            <div>
                <ReactTags tags={tags} 
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag} />
            </div>
        )
    }
};
export default TagInput