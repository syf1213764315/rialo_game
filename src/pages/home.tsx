/* eslint-disable @next/next/no-img-element */
import { Roundarrow, Tripledot } from "../components/Svglist";
import Playhistory from "../components/Playhistory";
import Sidebar from "../components/Sidebar";
import { useSolanaPrice } from "../utils/util";
import { MOCK_WINNERS, MOCK_TOTAL_WINS, MOCK_TOTAL_COUNT } from "../mock/data";

export default function Home(props: { isMute: boolean; setIsMute: Function }) {
  const recentWinnders = MOCK_WINNERS;
  const totalWins      = MOCK_TOTAL_WINS;
  const totalCount     = MOCK_TOTAL_COUNT;
  const { data }       = useSolanaPrice();

  return (
    <div className="flex min-h-[100vh] bg-bg bg-cover bg-no-repeat w-full">
      <Sidebar />
      <main className="xl:w-[calc(100%-280px)] w-full flex flex-col ml-[80px] lg:ml-[280px] overflow-x-hidden">
        <div className="mt-0 flex-col relative w-full pb-20">
          <div className="h-[280px] md:h-[480px] overflow-hidden">
            <img src="/img/home-banner.jpg" alt="" />
          </div>
          <div className="pl-4 pr-4">
            <p className="font-font-mono text-[26.7px] font-normal mt-[38px] text-white-100 leading-10">
              Statistics
            </p>
            <div className="flex flex-wrap mt-[18px] rounded-[8px] gap-[13px]">
              <div className=" relative flex flex-col h-[205px] lg:w-[calc((100%-40px)/3)] w-full rounded-[8px] border-[1.33px] border-[#FFFFFF1A]">
                <div className="mt-6 ml-6 bg-[#c8bfa8] rounded-[8px] w-[46px] h-[46px] "></div>
                <p className="text-[32px] text-white-100 font-bold leading-[52px] mt-[13.35px] ml-6">
                  {typeof data === "number"
                    ? "$" + (totalWins * data * 1.04).toLocaleString()
                    : "---"}
                </p>
                <p className="text-md text-white-100 font-normal leading-[26px] mt-[10.73px] ml-6">
                  Amount Wagered
                </p>
              </div>
              <div className=" relative flex flex-col h-[205px] lg:w-[calc((100%-40px)/3)] w-full rounded-[8px] border-[1.33px] border-[#FFFFFF1A]">
                <div className="flex justify-center items-center mt-6 ml-6 bg-[#a89882] rounded-[8px] w-[46px] h-[46px]"></div>
                <p className="text-[32px] text-white-100 font-bold leading-[52px] mt-[13.35px] ml-6">
                  {totalCount.toLocaleString()}
                </p>
                <p className="text-md text-white-100 font-normal leading-[26px] mt-[10.73px] ml-6">
                  Bets placed All Time
                </p>
              </div>
              <div className=" relative flex flex-col h-[205px] lg:w-[calc((100%-40px)/3)] w-full rounded-[8px] border-[1.33px] border-[#FFFFFF1A]">
                <div className="flex justify-center items-center mt-6 ml-6 bg-[#8a7e70] rounded-[8px] w-[46px] h-[46px]"></div>
                <p className="text-[32px] text-white-100 font-bold leading-[52px] mt-[13.35px] ml-6">
                  {typeof data === "number"
                    ? "$" + (totalWins * data).toLocaleString()
                    : "---"}
                </p>
                <p className="text-md text-white-100 font-normal leading-[26px] mt-[10.73px] ml-6">
                  Total Wins
                </p>
              </div>
            </div>
            <p className="font-font-mono text-[26.7px] font-normal mt-[29.36px] text-white-100 leading-10">
              Recent Player
            </p>

            <div className="w-full overflow-x-auto">
              <div className="min-w-[650px]">
                <div className="flex flex-row mt-[19px] mb-2 justify-between">
                  <p className="w-[200px] text-sm text-[#FFFFFFA8] text-center">
                    Game
                  </p>
                  <p className="w-[250px] text-sm text-[#FFFFFFA8] text-center">
                    Wallet
                  </p>
                  <p className="w-[150px] text-sm text-[#FFFFFFA8] text-center">
                    Bet
                  </p>
                  <p className="w-[150px] text-sm text-[#FFFFFFA8] text-center">
                    Payout
                  </p>
                  <p className="w-[150px] text-sm text-[#FFFFFFA8] text-center">
                    TX
                  </p>
                </div>
                {recentWinnders &&
                  recentWinnders.length !== 0 &&
                  recentWinnders.map((item: any, key) => (
                    <Playhistory
                      key={key}
                      game="The Tower"
                      user={item.user.slice(0, 4) + "..." + item.user.slice(-4)}
                      bet={`${item.bet_amount} SOL`}
                      payout={`${item.payout} SOL`}
                      tx={item.tx}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
