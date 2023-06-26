import Styles from "./ThumbnailRenderer.module.scss";

export default function ThumbnailRenderer({ images }) {
  const list = [
    {
      _id: "6378f4261b0e9864bba35730",
      date: "2021-06-30T18:30:00.000Z",
      originalFileUrl: 'https://drive.google.com/uc?export=view&id=176ntgfIIRe__Er1ghU_2DxGAO6MYl9wd',
      thumbnailUrl: 'https://drive.google.com/uc?export=view&id=1UwVpS_PMaOB02BRkKzxWoovwsglytZ28',
      midResUrl: 'https://drive.google.com/uc?export=view&id=1ASwybaRK-GrDX5uQc_jq7xSspPU2dsXs'
    },
    {
      _id: "6378f4261b0e9864bba35731",
      date: '2021-06-30T18:30:00.000Z',
      originalFileUrl: 'https://drive.google.com/uc?export=view&id=10JvoonC_mxEU2zXilSpT34KvbnCWxdB_',
      thumbnailUrl: 'https://drive.google.com/uc?export=view&id=1yrDCdBKf11idRY_tKIIXeXJXOW67Hz_B',
      midResUrl: 'https://drive.google.com/uc?export=view&id=1MJ0F3c_D_MY6HY8IJwvayy7NUM49o1bo'
    },
    // {
    //   _id: "6378f4261b0e9864bba35732",
    //   date: "2021-06-30T18:30:00.000Z",
    //   originalFileUrl: 'https://drive.google.com/uc?export=view&id=1uQR2nh9nvOj3UVSQAv0KisninEfSZnbB',
    //   thumbnailUrl: 'https://drive.google.com/uc?export=view&id=1hZEUkq_oVDkt8qCQPc1EOQh-Cs1c4UFJ',
    //   midResUrl: 'https://drive.google.com/uc?export=view&id=180y1VR24jSYzKjeDPySUIIC__PvtRS6V'
    // }
  ];

  const renderPhotos = () => {
    const listOfImages = list.map((element, index) => {
        if (element !== undefined || element !== null)
            return (
                <div key={element._id} className={Styles.photoHolder}>
                    <img
                        src={element.thumbnailUrl}
                        alt={index}
                        rel="noreferrer noopener"
                        referrerPolicy="no-referrer"
                    />
                </div>
            );
    });
    return listOfImages.slice(0, 3);
  };

  return (
    <div className={Styles.wrapper}>
        {list.length > 0 ? (
        <div className={Styles.photoContainer}>
          {renderPhotos()}
      </div>
      ) : null}

      {list.length > 0 ? (
        <div className={Styles.totalHolder}>
          <p>{list.length} photo(s)</p>
        </div>
      ) : null}
    </div>
  );
}
