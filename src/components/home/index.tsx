/* eslint-disable import/no-named-as-default-member */
import { fetchDataHome } from '@/api-client/home.service'
import { Banner } from '@/components/home/banner'
import { CAHNTV } from '@/components/home/CAHNTV'
import { Categories } from '@/components/home/Categories'
import { Matches } from '@/components/home/Matches'
import { News } from '@/components/home/News'
import { Products } from '@/components/home/Products'
import { Sponsor } from '@/components/home/Sponsor'
import { Team } from '@/components/home/Team'
import { TrapezoidInfo } from '@/components/home/TrapezoidInfo'
import { IRank, IMatch, INews, ICatv } from '@/models'
import { IBanner } from '@/models/banner'
import { IDonor } from '@/models/donor'
import { IProduct } from '@/models/product'
import { ITeam } from '@/models/team'
import { Box, Container } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { ICategory } from './category'

export default function Home() {
  const sectionRefs = useRef<any>([])

  const sectionIds = [
    'banner',
    'upcoming-match',
    'ranking',
    'matches',
    'news',
    'categories',
    'products',
    'videos',
    'main-team',
    // 'donors',
  ]
  const [sectionsData, setSectionsData] = useState([
    { id: 'banner', loaded: false, data: [] },
    { id: 'upcoming-match', loaded: false, data: [] },
    { id: 'ranking', loaded: false, data: [] },
    { id: 'matches', loaded: false, data: [] },
    { id: 'news', loaded: false, data: [] },
    { id: 'categories', loaded: false, data: [] },
    { id: 'products', loaded: false, data: [] },
    { id: 'videos', loaded: false, data: [] },
    { id: 'main-team', loaded: false, data: [] },
    // { id: 'donors', loaded: false, data: [] },
  ])

  useEffect(() => {
    ;(async () => {
      try {
        const sectionData = sectionsData.find(data => data.id === 'ranking')
        if (sectionData && !sectionData.loaded) {
          const data = await fetchDataHome('ranking')
          sectionData.data = data as any
          sectionData.loaded = true
          const newSectionsData = [...sectionsData, sectionData]
          setSectionsData([...newSectionsData])
        }
      } catch (error) {}
    })()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(async entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('id')
          const sectionData = sectionsData.find(data => data.id === sectionId)

          if (sectionData && !sectionData.loaded) {
            // Gọi API để lấy dữ liệu cho section này

            const data = await fetchDataHome(sectionId ?? '')
            sectionData.data = data as any
            sectionData.loaded = true
            const newSectionsData = [...sectionsData, sectionData]
            setSectionsData([...newSectionsData])
          }
        }
      })
    })

    sectionRefs.current.forEach((ref: any) => {
      if (ref) {
        observer.observe(ref)
      }
    })

    return () => {
      sectionRefs.current.forEach((ref: any) => {
        if (ref) {
          observer.unobserve(ref)
        }
      })
    }
  }, [])

  return (
    <Box position={'relative'} bgcolor={'#ed1e24'}>
      <section
        ref={el => (sectionRefs.current[sectionIds.indexOf('banner')] = el)}
        id={'banner'}
      >
        <Banner
          data={
            sectionsData.find(data => data.id === 'banner')?.data as IBanner[]
          }
        />
      </section>
      <Box
        pt={9.5}
        pb={6}
        sx={{
          textAlign: 'center',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundImage: 'url(/assets/images/home/bg-match.jpg)',
        }}
      >
        <Container sx={{ position: 'relative' }}>
          <section
            ref={el =>
              (sectionRefs.current[sectionIds.indexOf('upcoming-match')] = el)
            }
            id={'upcoming-match'}
          >
            <TrapezoidInfo
              ranks={
                sectionsData.find(data => data.id === 'ranking')
                  ?.data as IRank[]
              }
              match={
                sectionsData.find(data => data.id === 'upcoming-match')
                  ?.data as IMatch
              }
            />
          </section>
          <section
            ref={el =>
              (sectionRefs.current[sectionIds.indexOf('matches')] = el)
            }
            id={'matches'}
          >
            <Matches
              matches={
                sectionsData.find(data => data.id === 'matches')
                  ?.data as IMatch[]
              }
            />
          </section>
        </Container>
      </Box>
      <section
        ref={el => (sectionRefs.current[sectionIds.indexOf('news')] = el)}
        id={'news'}
      >
        <Box
          py={8}
          sx={{
            bgcolor: '#ffffff',
          }}
        >
          <Container sx={{ position: 'relative' }}>
            <News
              newsList={
                sectionsData.find(data => data.id === 'news')?.data as INews[]
              }
            />
          </Container>
        </Box>
      </section>
      <section
        ref={el => (sectionRefs.current[sectionIds.indexOf('categories')] = el)}
        id={'categories'}
      >
        <Categories
          categories={
            sectionsData.find(data => data.id === 'categories')
              ?.data as ICategory[]
          }
        />
      </section>
      <section
        ref={el => (sectionRefs.current[sectionIds.indexOf('products')] = el)}
        id={'products'}
      >
        <Products
          products={
            sectionsData.find(data => data.id === 'products')
              ?.data as IProduct[]
          }
        />
      </section>
      <section
        ref={el => (sectionRefs.current[sectionIds.indexOf('videos')] = el)}
        id={'videos'}
      >
        <Box
          py={8}
          sx={{
            bgcolor: '#ffffff',
          }}
        >
          <Container sx={{ position: 'relative' }}>
            <CAHNTV
              catvs={
                sectionsData.find(data => data.id === 'videos')?.data as ICatv[]
              }
            />
          </Container>
        </Box>
      </section>
      <section
        ref={el => (sectionRefs.current[sectionIds.indexOf('main-team')] = el)}
        id="main-team"
      >
        <Team
          team={
            sectionsData.find(data => data.id === 'main-team')?.data as ITeam[]
          }
        />
      </section>
      {/* <section
        ref={el => (sectionRefs.current[sectionIds.indexOf('donors')] = el)}
        id="donors"
      >
        <Sponsor
          donors={
            sectionsData.find(data => data.id === 'donors')?.data as IDonor[]
          }
        />
      </section> */}
    </Box>
  )
}
