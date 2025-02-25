import KeywordRanking from './KeywordRanking';

export default function HotKeyword() {
  return (
    <section className="mt-[40px]">
      <div className="w-full flex items-end justify-between">
        <h2 className="font-bold">인기 검색어</h2>
        <p className="text-xs text-gray-400">02.07 00:00 기준</p>
      </div>
      <ul>
        {['키워드', '키워드', '키워드', '키워드', '키워드', '키워드', '키워드', '키워드', '키워드', '키워드'].map(
          (keyword, key) => (
            <KeywordRanking keyword={keyword} rank={key} key={key} />
          )
        )}
      </ul>
    </section>
  );
}
