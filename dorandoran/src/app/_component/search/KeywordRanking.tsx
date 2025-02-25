interface KeywordRankingProps {
  rank: number;
  keyword: string;
}

export default function KeywordRanking({ rank, keyword }: KeywordRankingProps) {
  return (
    <li className="flex items-center gap-2">
      <strong className={`w-6 ${rank <= 3 ? 'text-[#7B3796]' : ''}`}>{rank}</strong>
      <span className="text-sm">{keyword}</span>
    </li>
  );
}
