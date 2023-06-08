import { useEffect, useState } from "react";
import LoadingWindow from "../../components/LoadingWindow/LoadingWindow";
import DisplayCard from "../../components/DisplayCard/DisplayCard";
import EmptyList from "../../components/MessageCards/EmptyList";
import CustomErrorMessage from "../../components/MessageCards/CustomErrorMessage";

import { getArtList } from "../../services/artService";

import "./Art.scss";
import CustomButton from "../../components/CustomButton/CustomButton";

import useSWRInfinite from "swr/infinite";



function Art() {
  // const [page, setPage] = useState(1);
  const [artList, setArtList] = useState([]);
  const [totalCount, setTotalCount] = useState(null);

  const getKey = (page) => {
    page = page + 1;

    return [`/arts/`, page]                    
  }

  const {isLoading, error, data, size, setSize, } = useSWRInfinite(
    getKey,
    ([key, page]) => getArtList(page),
  );

  useEffect(() => {
    if(data !== undefined && data !== null){
      setArtList(prev => {
        const list = [];
        
        data.map(res => list.push(...res.arts));
        return list;
      })

      if(data.length > 0){
        setTotalCount(data[0].totalCount);
      }
    }

  }, [data])

  const loadingMore = size !== data?.length;

  console.log({size, isLoading, loadingMore});

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

      {isLoading || loadingMore ? <LoadingWindow showCaption={true} /> : null}
      {!isLoading && error ? <CustomErrorMessage textToDisplay={error.toString()} /> : null}
      {!loadingMore && totalCount !== null && totalCount > artList.length ? <CustomButton title="Load More" onButtonClicked={() => setSize( size + 1)}/> : null}
    </div>
  );
}

export default Art;
