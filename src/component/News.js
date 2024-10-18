import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Loader from "./Loader";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

// import PropTypes from 'prop-types'

export class News extends Component {
    static defaultTypes = {
        country: 'us',
        pageSize: 7,
        category: "general"
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }



    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        };
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsFundaa`;
        // console.log("hello");
    }

    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
            
        });
        this.props.setProgress(100);
    }
    
    
    async componentDidMount() {
        //     let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5bd1f79159a8434f96dada3f34b3580d&page=1&pagesize=${this.props.pageSize}`;
        //     this.setState({loading:true});
        //     let data = await fetch(url);
        //     let parsedData = await data.json();
        //     console.log(parsedData);
        //     this.setState({ articles:this.state.articles.concat(parsedData.articles) ,
        //                     totalResults : parsedData.totalResults,
        //                     loading : false});
        this.updateNews();
    }
    
    // handlePrevClick = async () => {
    //     // let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5bd1f79159a8434f96dada3f34b3580d&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`;
    //     // this.setState({loading:true});
    //     // let data = await fetch(url);
    //     // let parsedData = await data.json();
    //     // console.log(parsedData);
    //     // this.setState({ 
    //     //     page:this.state.page - 1,
    //     //     articles:parsedData.articles,
    //     //     loading : false});
    //     this.setState({ page: this.state.page - 1 });
    //     this.updateNews();

    // }

    // handleNextClick = async () => {
    //     // if(!(this.state.page+1 > Math.ceil(this.state.totalResults/20))){
    //     //     let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5bd1f79159a8434f96dada3f34b3580d&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
    //     //     this.setState({loading:true});
    //     //     let data = await fetch(url);
    //     //     let parsedData = await data.json();
    //     //     console.log(parsedData);
    //     //     this.setState({
    //     //         page:this.state.page + 1,
    //     //         articles:parsedData.articles,
    //     //         loading : false})    
    //     // }
    //     this.setState({ page: this.state.page + 1 })
    //     this.updateNews();

    // }

    fetchMoreData = async () => {
        this.setState({page:this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles:this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
    }
)};



    render() {
        return (
            <div className="p-5">
                <div className="container ">
                    <h2 className="text-center">NewsFundaa - Top {this.capitalizeFirstLetter(this.props.category)} HeadLines</h2>
                    {this.state.loading && <Loader />}

                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={<Loader/>}
                    >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4 my-2" key={element.url}>
                                    <Newsitem
                                        title={element.title !== null ? element.title.slice(0, 40) : ""}
                                        description={element.description !== null ? element.description.slice(0, 80) : ""}
                                        imageUrl={element.urlToImage}
                                        newsUrl={element.url}
                                        author={element.author}
                                        date={element.publishedAt}
                                    />
                                </div>;
                            })}
                        </div>
                        </div>
                    </InfiniteScroll>
                </div>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>prev</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 20)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>next</button>
                </div> */}
            </div>
        );
    }
}

export default News;
