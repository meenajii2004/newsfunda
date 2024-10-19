import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import Loader from "./Loader";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

// import PropTypes from 'prop-types'

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }




    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=${page}&pagesize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);

        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `${ capitalizeFirstLetter(props.category)} - NewsFundaa`; 
        updateNews();
    }, [])

    // const handlePrevClick = async () => {
    //     setPage(page - 1);
    //     updateNews();
    // }

    // const handleNextClick = async () => {
    //     setPage(page + 1)
    //     updateNews();
    // }
    
    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=${ page+1}&pagesize=${props.pageSize}`;
        setPage(page + 1)
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
    };


    return (
        <div className="p-5">
            <div className="container ">
                <h2 className="text-center" style={{marginTop:'30px',marginBottom:'20px'}}>NewsFundaa - Top {capitalizeFirstLetter(props.category)} HeadLines</h2>
                {loading && <Loader />}

                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Loader />}
                >
                    <div className="container">
                        <div className="row">
                            {articles.map((element) => {
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
                    <button disabled={  page <= 1} type="button" className="btn btn-dark" onClick={ handlePrevClick}>prev</button>
                    <button disabled={  page + 1 > Math.ceil(  totalResults / 20)} type="button" className="btn btn-dark" onClick={ handleNextClick}>next</button>
                </div> */}
        </div>
    );
}

export default News;

News.defaultTypes = {
    country: 'us',
    pageSize: 7,
    category: "general"
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
}
