import KeywordRanking from './KeywordRanking';
import getCurrentTimeWith30Min from '@/app/_util/getCurrentTimeWith30Min';

export default function HotKeyword() {
  const keywords = [
    '키워드1',
    '키워드2',
    '키워드3',
    '키워드4',
    '키워드5',
    '키워드6',
    '키워드7',
    '키워드8',
    '키워드9',
    '키워드10',
  ];

  return (
    <section className="mt-[40px]">
      <div className="w-full flex items-end justify-between">
        <h2 className="text-lg font-bold">인기 검색어</h2>
        <p className="text-xs text-gray-400">{getCurrentTimeWith30Min()} 기준</p>
      </div>
      <div className="flex px-3 mt-5">
        <ul className="flex flex-col w-1/2 gap-3">
          {keywords.slice(0, 5).map((keyword, index) => (
            <KeywordRanking keyword={keyword} rank={index + 1} key={index} />
          ))}
        </ul>
        <ul className="flex flex-col w-1/2 gap-3">
          {keywords.slice(5, 10).map((keyword, index) => (
            <KeywordRanking keyword={keyword} rank={index + 6} key={index} />
          ))}
        </ul>
      </div>
    </section>
  );
}
