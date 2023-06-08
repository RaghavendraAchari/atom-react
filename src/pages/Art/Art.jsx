import { useEffect, useState } from "react";
import LoadingWindow from "../../components/LoadingWindow/LoadingWindow";
import DisplayCard from "../../components/DisplayCard/DisplayCard";
import EmptyList from "../../components/MessageCards/EmptyList";
import CustomErrorMessage from "../../components/MessageCards/CustomErrorMessage";

import { getArtList } from "../../services/artService";

import "./Art.scss";
import CustomButton from "../../components/CustomButton/CustomButton";

import useSWRImmutable from "swr";

function Art() {
  const [page, setPage] = useState(1);
  const [artList, setArtList] = useState([]);
  const [totalCount, setTotalCount] = useState(null);

  const {isLoading, error, data} = useSWRImmutable(
    [`/arts/`, page],
    ([key, page]) => getArtList(page)
  )

  useEffect(() => {
    if(data !== null && data !== undefined) {
      if(page === 1){
        setArtList(data.arts);
        setTotalCount(data.totalCount)
      }else{
        setArtList(prev => [...prev, ...data.arts]);
        setTotalCount(data.totalCount)
      }
    }
  },[page, data])

  // console.log({page, isLoading, error, data});

  function onLoadMoreClicked(){
    if(totalCount > artList.length){
      setPage(prev => prev + 1);
    }
  }

  return (
    <div className="art-page avoid-nav">
      { (!isLoading && artList.length === 0) ? <div className="no-items">
          <EmptyList />
        </div> : null
      }

      {artList.length > 0 ? artList.map((element, index) => {
          return <DisplayCard key={element._id} feedType="Art" feedDetails={element} />
        }) : null
      }

      {isLoading ? <LoadingWindow showCaption={true} /> : null}
      {!isLoading && error ? <CustomErrorMessage textToDisplay={error} /> : null}
      {totalCount !== null && totalCount > artList.length ? <CustomButton title="Load More" onButtonClicked={onLoadMoreClicked}/> : null}
    </div>
  );
}

export default Art;
