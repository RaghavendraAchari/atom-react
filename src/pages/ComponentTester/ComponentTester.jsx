import DataNotFound from "../../components/MessageCards/DataNotFound";
import EmptyList from "../../components/MessageCards/EmptyList";
import ServerConnectionError from "../../components/MessageCards/ServerConnectionError";
import DisplayCard from "../../components/DisplayCard/DisplayCard";
import Styles from "./ComponentTester.module.scss";
import CustomButton from "../../components/CustomButton/CustomButton";
import { toast } from "react-toastify";
import Dashboard from "../Admin/DashBoard/Dashboard";



export default function ComponentTester() {

    return <div className={Styles.wrapper}>
        {/* <div className={Styles.row}>
            <DataNotFound />
        </div>
        <div className={Styles.row}>
            <EmptyList />
        </div>
        <div className={Styles.row}>
            <ServerConnectionError />
        </div>
        <div className={Styles.row}>
            <CustomButton title="Load More" onButtonClicked={onLoadMoreClicked} />
        </div>
        <div className={Styles.row}>
            <DisplayCard
                feedDetails={
                    {
                        _id: "63469858583be515105445d6",
                        title: "Kadle beach",
                        description: "Kadle is a small village near Kumta. My hometown (kumta) is located on the seashore of Arabian Sea. So most of the village is on the edge of the sea. Kadle is also one among them. As we went to visit, I took some of the photos and these two are worth sharing.",
                        category: [
                            "Nature"
                        ],
                        date: "2020-12-23T00:00:00.000Z",
                        details: "First one is kind of my favourite. An aged person was on his daily walking routine and I happened to capture him. The clouded sky with rays coming out adds more depth to this picture. It was also the covid time, hence the mask on his face. At that time this photo felt different. All were kind of finding something in this lonely world, and this man silently walked around. Maybe he is also looking for something or someone. Or may be realizing that we are nothing in front of this vast cosmos.\nSecond one is the footprint of a puppy and its mother. They were aligned in a beautiful way. The puppy was in front and the mother followed it. The photo came as an abstract art. That's the reason behind liking it.\nEnjoy the photos :)\n",
                        photos: [
                            {
                                _id: "63469858583be515105445d4",
                                date: "2020-12-23T00:00:00.000Z",
                                originalFileUrl: "https://drive.google.com/uc?export=view&id=1uyTc4gI4qPioTitij4gaX1u9lPFkeFow",
                                thumbnailUrl: "https://drive.google.com/uc?export=view&id=1lO7Ezao2bSbdb8zvOX-lXI7nJCIesBVG"
                            },
                            {
                                _id: "63469858583be515105445d6",
                                date: "2020-12-23T00:00:00.000Z",
                                originalFileUrl: "https://drive.google.com/uc?export=view&id=1uyTc4gI4qPioTitij4gaX1u9lPFkeFow",
                                thumbnailUrl: "https://drive.google.com/uc?export=view&id=1lO7Ezao2bSbdb8zvOX-lXI7nJCIesBVG"
                            },
                            {
                                _id: "63469858583be515105445d7",
                                date: "2020-12-23T00:00:00.000Z",
                                originalFileUrl: "https://drive.google.com/uc?export=view&id=1uyTc4gI4qPioTitij4gaX1u9lPFkeFow",
                                thumbnailUrl: "https://drive.google.com/uc?export=view&id=1lO7Ezao2bSbdb8zvOX-lXI7nJCIesBVG"
                            },
                            {
                                _id: "63469858583be515105445d8",
                                date: "2020-12-23T00:00:00.000Z",
                                originalFileUrl: "https://drive.google.com/uc?export=view&id=1uyTc4gI4qPioTitij4gaX1u9lPFkeFow",
                                thumbnailUrl: "https://drive.google.com/uc?export=view&id=1lO7Ezao2bSbdb8zvOX-lXI7nJCIesBVG"
                            }
                        ]
                    }
                }
                feedType="Photo" />
        </div> */}

        <div className={Styles.row} style={{height: '100%'}}>
            <Dashboard />
        </div>
    </div>
}

function onLoadMoreClicked(){
    toast.success("LoadMore Clicked");
}