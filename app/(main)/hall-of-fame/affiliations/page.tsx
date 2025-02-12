import CountriesTable from "./CountriesTable";
import TopThreeCountries from "./TopThreeCountries";

export interface Countries {
  countryName: string;
  id: number;
  rank: number;
  totalPoint: number;
  countryFlag: string;
  top3Teams: Team[];
}

export interface Team {
  Name: string;
  Points: number;
  Avatar: string;
}

const Affiliations = () => {
  return (
    <>
      <TopThreeCountries />
      <CountriesTable />
    </>
  );
};

export default Affiliations;
