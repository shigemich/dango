import { promises } from 'fs';
import { GetStaticProps, NextPage } from 'next';
import { join } from 'path';
import React, { ReactElement, useState } from 'react';
import { Button } from '../components/Button';
import { CatImage } from '../components/CatImage';
import { Country, RandomCat } from '../lib/Types.js';

type LabourHour = {
  start: string;
  end: string;
};

type Props = Readonly<{
  countries: Array<Country>;
}>;

const IndexPage: NextPage<Props> = ({ countries }: Props): ReactElement => {
  
  const [labourHours, setLabourHours] = useState<LabourHour>({
    start: '',
    end: ''
  });

  const [breakTimes, setBreakTimes] = useState<Array<LabourHour>>([]);

  const calculateLabourTime = (): string => {
    console.log(labourHours)
      const start = labourHours.start.split(':');
      const end = labourHours.end.split(':');
      const startHour = Number(start[0]);
      const startMinute = Number(start[1]);
      const endHour = Number(end[0]);
      const endMinute = Number(end[1]);
      
      if (Number.isNaN(startHour) || Number.isNaN(startMinute) || Number.isNaN(endHour) || Number.isNaN(endMinute)) {
        return '';
      }

      const totalLabourMinutes = ((endHour - startHour) * 60 + (endMinute - startMinute));
      const totalBreakMinutes = calculateBreakMinutes();
      const netLabourMinutes = totalLabourMinutes - totalBreakMinutes;
      const hours = Math.floor(netLabourMinutes / 60);
      const minutes = netLabourMinutes % 60;
      
      return `${hours}:${minutes.toString().padStart(2, '0')}`;

  };

  const calculateBreakMinutes = (breakTime:LabourHour): number => {
        const start = breakTime.start.split(':');
        const end = breakTime.end.split(':');
        const startHour = Number(start[0]);
        const startMinute = Number(start[1]);
        const endHour = Number(end[0]);
        const endMinute = Number(end[1]);
        
        if (Number.isNaN(startHour) || Number.isNaN(startMinute) || Number.isNaN(endHour) || Number.isNaN(endMinute)) {
          return 0
        }
        
        const startMinutes = startHour * 60 + startMinute;
        const endMinutes = endHour * 60 + endMinute;
       return endMinutes - startMinutes 
      
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabourHours(prevState => ({
      ...prevState,
      start: e.target.value
    }));
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabourHours(prevState => ({
      ...prevState,
      end: e.target.value
    }));
  };

  const handleBreakStartTimeChange = (index: number, value: string) => {
    const newBreakTimes = [...breakTimes];
    newBreakTimes[index] = { ...newBreakTimes[index], start: value };
    setBreakTimes(newBreakTimes);
  };

  const handleBreakEndTimeChange = (index: number, value: string) => {
    const newBreakTimes = [...breakTimes];
    newBreakTimes[index] = { ...newBreakTimes[index], end: value };
    setBreakTimes(newBreakTimes);
  };

  const handleAddBreakTime = () => {
    setBreakTimes([...breakTimes, { start: '', end: '' }]);
  };

  const handleDeleteLastBreakTime = () => {
    if (breakTimes.length > 0) {
      const newBreakTimes = breakTimes.slice(0, -1);
      setBreakTimes(newBreakTimes);
    }
  };

  return (
    <>
      <div className="m-10 p-4 w-2/3 mx-auto shadow-lg border-2 rounded-2xl">
        <div className="mx-auto">
          <div className="grid grid-cols-3 gap-2">
            <span className="text-gray-800 text-lg">勤務開始時間</span>
            <span className="text-gray-800 text-lg">勤務終了時間</span>
            <span className="text-gray-800 text-lg">労働時間（休憩除く）</span>
            <input
              className="py-2 px-3 border-2 rounded border-gray-200 cursor-text"
              type="text"
              value={labourHours.start}
              onChange={handleStartTimeChange}
            />
            <input
              className="py-2 px-3 border-2 rounded border-gray-200 cursor-text"
              type="text"
              value={labourHours.end}
              onChange={handleEndTimeChange}
            />
            <span className="select-none text-xl font-mono text-gray-700 text-right">
              {calculateLabourTime()}
            </span>
            <span className="text-gray-800 text-lg">休憩開始時間</span>
            <span className="text-gray-800 text-lg">休憩終了時間</span>
            <span className="text-gray-800 text-lg">休憩時間</span>
            {breakTimes.map((breakTime, index) => (
              <React.Fragment key={index}>
                <input
                  className="py-2 px-3 border-2 rounded border-gray-200 cursor-text"
                  type="text"
                  value={breakTime.start}
                  onChange={(e) => handleBreakStartTimeChange(index, e.target.value)}
                />
                <input
                  className="py-2 px-3 border-2 rounded border-gray-200 cursor-text"
                  type="text"
                  value={breakTime.end}
                  onChange={(e) => handleBreakEndTimeChange(index, e.target.value)}
                />
                <span className="select-none text-xl font-mono text-gray-700 text-right">
                  {calculateBreakMinutes(breakTime) / 60}:{(calculateBreakMinutes(breakTime) % 60).toString().padStart(2, '0')}
                </span>
              </React.Fragment>
            ))}
            <Button
              className="py-2 bg-cyan-600 text-white rounded border border-gray-200 cursor-pointer"
              onClick={handleAddBreakTime}>
                休憩時間を入力する
            </Button>
            <Button
              className="py-2 bg-pink-300 text-white rounded border border-gray-200 cursor-pointer"
              onClick={handleDeleteLastBreakTime}>
                一番下の休憩時間を削除する
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const buffer = await promises.readFile(join(process.cwd(), 'json', 'countries.json'));
  const str  = buffer.toString();

  return {
    props: {
      countries: JSON.parse(str) as Array<Country>
    }
  };
};

// eslint-disable-next-line import/no-default-export
export default IndexPage;