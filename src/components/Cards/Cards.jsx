import React from 'react'
import { Card, CardContent, Typography, Grid } from '@material-ui/core'
import CountUp from 'react-countup'
import cx from 'classnames'

import styles from './Cards.module.css'

const Cards = ({data: { confirmed, recovered, deaths, lastUpdate }}) => {
    if(!confirmed) {
        return 'Loading...'
    }

    const data = [confirmed, recovered, deaths]
    return (
        <div className={styles.container}>
            <Grid container spacing={3} justify='center'>
              {data.map((val, ind) => {
                return <Grid item component={Card} xs={12} md={3} className={
                  val === confirmed ? cx(styles.card, styles.infected) :
                  val === recovered ? cx(styles.card, styles.recovered) :
                  val === deaths && cx(styles.card, styles.deaths)
                  }>
                <CardContent>
                    <Typography color='textSecondary' gutterBottom>
                      {
                        val.confirmed ? 'Infected' :
                        val.recovered ? 'Recovered' :
                        val.deaths && 'Deaths'
                      }
                      
                    </Typography>
                    <Typography variant='h5'>
                      <CountUp start={0} end={
                        val === confirmed ? confirmed.value :
                        val === recovered ? recovered.value :
                        val === deaths && deaths.value
                        } 
                        duration={2.5} separator=',' />
                    </Typography>
                    <Typography color='textSecondary'>{new Date(lastUpdate).toDateString()}</Typography>
                    <Typography variant='body2'>
                      {
                        val === confirmed ? 'Number of active cases of covid-19' :
                        val === recovered ? 'Number of recoveries from covid-19' :
                        val === deaths && 'Number of deaths caused by covid-19'
                      }
                      
                    </Typography>
                </CardContent>
              </Grid>
              })}
            </Grid>
        </div>
    )
}

export default Cards