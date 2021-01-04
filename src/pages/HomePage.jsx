import CardComponent from '../components/CardComponent';

import read from '../assets/images/undraw_studying_s3l7 (1).svg';

const datas = [
  { stage: '1st' },
  { stage: '2nd' },
  { stage: '3rd' },
  { stage: '4th' },
];

function HomePage() {
  return (
    <>
      <div className="container px-32 mx-auto">
        <div className=" containe d-none d-lg-block"></div>
        <div className="row items-center">
          <div className="col-lg-6 mb-20 lg:mb-0">
            <div className="heroSection">
              <h1 className="text-5xl font-semibold ">SoftLectures</h1>
              <h2 className="text-3xl font-medium">
                Easily download and wacth your online lectures
              </h2>
              <img src={read} alt="read" className="img-fluid w-5/6" />
            </div>
          </div>
          <div className="col-lg-6 flex justify-between  flex-wrap ">
            <div className="row ">
              {datas.map((item) => (
                <div className="col-md-6" key={item.stage}>
                  <CardComponent text={item.stage} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
