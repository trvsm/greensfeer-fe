import "./ProfileAffiliations.scss";
import companyLogo1 from "../../assets/images/affiliation1.png";
import companyLogo2 from "../../assets/images/affiliation2.png";
import UserAffilliations from "../../data/UserAffiliations.json";
import { IoIosAdd } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ICompany } from "customTypes";
import getAffiliation from "../../helpers/affiliationFetcher";
import { useAuth } from "src/context/AuthProvider/AuthProvider";

// interface UserAffiliations {
//   logo: string;
//   name: string;
//   link: string;
// }

export const ProfileAffiliations: React.FC = () => {
  const {uid}= useParams()
  const [userAfilliations, setUserAfilliation] = useState<ICompany[] | null>(
    null
  );
  useEffect(() => {
    const affiliations = async () => {
      if (uid){
        const affiliations = await getAffiliation(uid);
        console.log(affiliations)
        setUserAfilliation(affiliations);
      }
    };
    affiliations();
  }, []);
  const logoStyle1: React.CSSProperties = {
    background: `url(${companyLogo1}) center/cover no-repeat`,
  };
  const logoStyle2: React.CSSProperties = {
    background: `url(${companyLogo2}) center/cover no-repeat`,
  };
  const logoStyle: (logo: string) => React.CSSProperties = (logo) => {
    return { background: `url(${logo}) center/cover no-repeat` };
  };

  return (
    <div className="affiliations">
      <h3 className="affiliations__title">Affiliations</h3>
      <div className="affiliations__list">
        {userAfilliations &&
          userAfilliations?.length > 0 &&
          userAfilliations.map((aff) => (
            <div className="affiliations__company">
              <div className="affiliations__logo-div">
                <div
                  className="affiliations__logo"
                  style={logoStyle(aff.logo)}
                />
              </div>
              <p className="affiliations__name">{aff.name}</p>
            </div>
          ))}
        {/* <div className="affiliations__company">
          <div className="affiliations__logo-div">
            <div className="affiliations__logo" style={logoStyle2} />
          </div>
          <p className="affiliations__name">Tesla</p>
        </div>

        <div className="affiliations__company">
          <div className="affiliations__logo-div">
            <div className="affiliations__logo" style={logoStyle1} />
          </div>
          <p className="affiliations__name">Microsoft</p>
        </div> */}

        <div className="affiliations__company">
          <Link
            to="/create-company/step1"
            className="affiliations__logo-div-add"
          >
            <IoIosAdd />
          </Link>
          <p className="affiliations__name">Add New</p>
        </div>
      </div>
    </div>
  );
};
