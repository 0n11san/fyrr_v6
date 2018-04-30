import React, {Component} from 'react';
// import {Chart} from 'react-google-charts';
import Wrapper from '../Wrapper/Wrapper.js';
// import Container from '../Container/Container.js';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import './Find.css';
import axios from 'axios';
import moment from "moment";

// creates Find component to render to the page
class Find extends Component {
    constructor() {
        const currentDate = new Date();
        const currentDateMoment = moment(currentDate);
        super();
        this.state = {
            good: [],
            neutral: [],
            bad: [],
            //user should select which time frame they would like to see
            timeFrame: "week",
            //set currentWeek to current week number using moment
            currentWeek: currentDateMoment.week(),
            //set currentMonth to current month number using moment
            currentMonth: currentDateMoment.month() + 1,
            currentYear: currentDateMoment.year(),
            prevWeek: currentDateMoment.week(),
            prevMonth: currentDateMoment.month(),
            prevYear: currentDateMoment.year(),
            startOfWeek: "",
            endOfWeek: "",
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            username: JSON.parse(sessionStorage.getItem('UN')),
            pulled: false,
        };
    }

    // gets trends data
    getFromDB = () => {

        axios.get(`/api/mood/trends/${this.state.username}`)
            .then((data) => {
                data.data.forEach((ele, index) => {

                    this.setDate(ele.date);

                    if (ele.mood === "good" && moment(ele.date).week() === this.state.currentWeek) {
                        this.setState({good: [...this.state.good, ele.mood]})
                    }
                    else if (ele.mood === "neutral" && moment(ele.date).week() === this.state.currentWeek) {
                        this.setState({neutral: [...this.state.neutral, ele.mood]})
                    }
                    else if (ele.mood === "bad" && moment(ele.date).week() === this.state.currentWeek) {
                        this.setState({bad: [...this.state.bad, ele.mood]})
                    }
                });
            })
            .catch((err) => {
                console.log("There was an error.");
                console.log(err);
            })

    };

    // allows user to scroll through weeks or months based on selection
    whichWeek = (e) => {
        //date format is in YYYY - MM - DD

        if (this.state.timeFrame === "week") {
            if (e.target.id === "back") {
                if (this.state.prevWeek > 0) {
                    this.setState({prevWeek: this.state.prevWeek - 1});
                }
            }
            else if (e.target.id === "forward") {
                if (this.state.prevWeek < this.state.currentWeek) {
                    this.setState({prevWeek: this.state.prevWeek + 1});
                }
            }
        }
        else if (this.state.timeFrame === "month") {
            if (e.target.id === "back") {
                if (this.state.prevMonth > 0) {
                    this.setState({prevMonth: this.state.prevMonth - 1});
                }
            }
            else if (e.target.id === "forward") {
                if (this.state.prevMonth < this.state.currentMonth) {
                    this.setState({prevMonth: this.state.prevMonth + 1});
                }
            }
        }

        this.getTrendsData();
    };

    getTrendsData = () => {
        axios.get(`/api/mood/trends/prevdata/${this.state.username}`)
            .then((data) => {

                this.setState({good: 0, neutral: 0, bad: 0});
                data.data.forEach((ele, index) => {

                    //changes data displayed in graph by week
                    if (this.state.timeFrame === "week") {
                        if (ele.mood === "good" && moment(ele.date).week() === this.state.prevWeek) {
                            this.setState({good: [...this.state.good, ele.mood]});
                            this.setDate(ele.date);
                        }
                        else if (ele.mood === "neutral" && moment(ele.date).week() === this.state.prevWeek) {
                            this.setState({neutral: [...this.state.neutral, ele.mood]});
                            this.setDate(ele.date);
                        }
                        else if (ele.mood === "bad" && moment(ele.date).week() === this.state.prevWeek) {
                            this.setState({bad: [...this.state.bad, ele.mood]});
                            this.setDate(ele.date);
                        }
                    }
                    //changes data displayed in graph by month
                    else if (this.state.timeFrame === "month") {
                        if (ele.mood === "good" && moment(ele.date).month() === this.state.prevMonth) {
                            this.setState({good: [...this.state.good, ele.mood]});
                            this.setDate(ele.date);
                        }
                        else if (ele.mood === "neutral" && moment(ele.date).month() === this.state.prevMonth) {
                            this.setState({neutral: [...this.state.neutral, ele.mood]});
                            this.setDate(ele.date);
                        }
                        else if (ele.mood === "bad" && moment(ele.date).month() === this.state.prevMonth) {
                            this.setState({bad: [...this.state.bad, ele.mood]});
                            this.setDate(ele.date);
                        }
                    }
                })
            })
    };

    // sets week or month based on selection
    weekOrMonth = (e) => {
        const whichTrend = e.target.id;

        if (whichTrend === "week") {
            this.setState({timeFrame: "week"});
            this.getTrendsData();
        }
        else if (whichTrend === "month") {
            this.setState({timeFrame: "month"});
            this.getTrendsData();
        }

    };

    // sets the start and end of week dates
    setDate = (date) => {
        const startOfWeek = moment(date).startOf("week")._d;
        const endOfWeek = moment(date).endOf("week")._d;

        this.setState({
            startOfWeek: `${moment(startOfWeek).year()}-${moment(startOfWeek).month() + 1}-${moment(startOfWeek).date()}`,
            endOfWeek: `${moment(endOfWeek).year()}-${moment(endOfWeek).month() + 1}-${moment(endOfWeek).date()}`
        });
    };

    componentWillMount() {
        this.getFromDB();
    }

    componentDidMount() {
        this.setState({pulled: true});
    }

    render() {
        return (
            <Wrapper>
                <Header/>
                <div className="jumbotron">
                    <h1>Find a Rec Resource</h1>
                    <hr className="hr"/>
                </div>
                <Footer/>
            </Wrapper>
        )
    }
}

// exports Find for external use
export default Find;
