interface KeywordRankingProps {
  rank: number;
  keyword: string;
}

export default function KeywordRanking({ rank, keyword }: KeywordRankingProps) {
  console.log(rank, keyword);
  return (
    <li>
      <p>
        <strong>{rank}</strong> {keyword}
      </p>
    </li>
  );
}
