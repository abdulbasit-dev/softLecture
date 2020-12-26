import CardComponent from '../components/CardComponent';
import '../bootstrap-grid.css';

import read from '../images/undraw_studying_s3l7 (1).svg';

const datas = [
  { stage: '1st Stage' },
  { stage: '2nd Stage' },
  { stage: '3rd Stage' },
  { stage: '4th Stage' },
];

function HomePage() {
  return (
    <>
      <div className="containe px-32 mx-auto">
        <div className="row items-center">
          <div className="col-md-6">
            <div className="heroSection">
              <h1 className="text-5xl font-semibold ">SoftLectures</h1>
              <h2 className="text-3xl font-medium">
                Easily download and wacth your online lucturs
              </h2>
              <img src={read} alt="read" className="img-fluid w-5/6" />
            </div>
          </div>
          <div className="col-md-6    flex justify-between  flex-wrap">
            {datas.map((item) => (
              <CardComponent key={item.stage} text={item.stage} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
