import Carousel from './_component/landing/Carousel';
import NewChat from './_component/landing/NewChat';
import Recommend from './_component/landing/Recommend';

export default function Home() {
  return (
    <div className="h-full">
      <Carousel />
      <NewChat />
      <Recommend />
    </div>
  );
}
