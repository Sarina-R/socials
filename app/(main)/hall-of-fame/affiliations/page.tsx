import CountriesTable from "./CountriesTable";
import TopThreeCountries from "./TopThreeCountries";

export interface Countries {
  countryName: string;
  id: number;
  rank: number;
  totalPoint: number;
  countryFlag: string;
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
