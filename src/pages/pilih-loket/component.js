import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import AppBar from '../../component/appbar';
import BoxCategoryLocket from '../../component/Box-category-loket';
import BottomNavigation from '../../component/bottom-navigation';
import { Link } from 'react-router-dom';
import Modal from '../../component/modal-pilih-loket';
import { getListLoket } from '../../services/loket-category';
import ContentLoader from 'react-content-loader';

const MyLoader = () => (
  <ContentLoader
    height={146}
    width={400}
    speed={2}
    primaryColor="#F4F4F4"
    secondaryColor="#E6E6E6"
  >
 <rect x="123" y="23" rx="0" ry="0" width="0" height="0" /> 
    <rect x="30" y="41" rx="0" ry="0" width="86" height="86" /> 
    <rect x="149" y="42" rx="0" ry="0" width="189" height="29" /> 
    <rect x="149" y="94" rx="0" ry="0" width="189" height="29" /> 
    <rect x="29" y="173" rx="0" ry="0" width="86" height="86" /> 
    <rect x="149" y="179" rx="0" ry="0" width="189" height="29" /> 
    <rect x="149" y="231" rx="0" ry="0" width="189" height="29" /> 
    <rect x="30" y="321" rx="0" ry="0" width="86" height="86" /> 
    <rect x="148" y="325" rx="0" ry="0" width="189" height="29" /> 
  </ContentLoader>
);
function PilihLocket(props) {
  const [open, setOpen] = useState(false);
  const [locket, setLoket] = useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    console.log(locket);
    const getLoket = async () => {
      const loket = await getListLoket();
      setLoket(loket);
    };
    setTimeout(() => {
      getLoket().then(() => {
        setIsLoading(false);
      });
    }, 1000);

    // getLoket()
  }, []);
  const { classes } = props;

  return (
    <Container maxWidth="xs" className={classes.Container}>
      <AppBar goBack title="Pilih Loket Antrian" />
      {isLoading == true ? (
              <div
                style={{
                  marginTop: 70,
                  width: '100%',
                  backgroundColor: 'white'
                }}
              >
                <MyLoader />
              </div>
            ) : (
      <div>
        <Grid container spacing={4} className={classes.gridUpper}>
          <Link className={classes.link} onClick={handleOpen}>
           
              <Grid item>
                {locket.map(data => {
                  return <BoxCategoryLocket title={data.loket} />;
                })}
              </Grid>
          </Link>
        </Grid>
        <Modal open={open} handleOpen={handleOpen} handleClose={handleClose} />
      </div>
            )}

      <BottomNavigation />
    </Container>
  );
}

export default PilihLocket;
