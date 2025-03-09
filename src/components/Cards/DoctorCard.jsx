import './DoctorCard.css'
import Button from '../Form/Button'

export default function DoctorCard({data}) {
  console.log(data);
  return (
    <>
        <div className="doctor-card-container">
            <div className="doctor-card">
                <div className="img-content">
                    <img src={data.image} alt="" />
                </div>
                <div className="content">
                    <p className="heading">{"د/ " + data.name}</p>
                    <p>{data.specialty}</p>
                    <p>{data.details}</p>
                    <Button name={"تفاصيل"} path={"/DoctorData"} data={data}  />
                </div>
            </div>
        </div>
    </>
  )
}
