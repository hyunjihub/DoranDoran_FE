import Carousel from './_component/landing/Carousel';
import Footer from './_component/layout/Footer';
import NewChat from './_component/landing/NewChat';
import Recommend from './_component/landing/Recommend';

export default function Home() {
  return (
    <>
      <div className="pb-10">
        <Carousel />
        <NewChat />
        <Recommend />
      </div>
      <Footer />
    </>
  );
}
