import React , {Component} from 'react';
import './assets/style.css'
import ReactDOM from "react-dom"
import quizService from './quizService'
import QuestionBox from "./Component/QuestionBox"
import Result from "./Component/Result"

class QuizBee extends Component {
    state = {
        questionBank: [],
        score : 0 , 
        responses : 0   }

    getQuestions = () => {
        quizService().then(question => {
            this.setState({
                questionBank : question
            });
        });
    };

    computeAnswer = (answer , correctanswer) => {
        if(answer == correctanswer) {
            this.setState ({
                score : this.state.score + 1
            })
        }
        this.setState({
            responses : this.state.responses < 5 ? this.state.responses +1 : 5
        })
    }

    playAgain = () => {
        this.getQuestions();
        this.setState ({
            score : 0 ,
            responses : 0
        })
    }

    componentDidMount() {
        this.getQuestions()
    }
    render() {
        return (
            <div className="container" >
                <div className="title" >
                    <p className="titletext">QuizBee</p>
                </div>
                {this.state.questionBank.length >0 && this.state.responses<5 && this.state.questionBank.map (({question , answers , correct , questionID}) => (
                       <QuestionBox question = {question} 
                                    options = {answers} 
                                    key={question.questionID} 
                                    selected = {answer => this.computeAnswer(answer,correct)}
                        />
                    ))}
                {this.state.responses === 5 ? (<Result score = {this.state.score} playAgain = {this.playAgain}/>) : null }
            </div>
        );
    } 
}

ReactDOM.render(<QuizBee /> , document.getElementById("root"))

