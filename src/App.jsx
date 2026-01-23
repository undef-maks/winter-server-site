import { useState, useEffect } from 'react'
import { Container, Card, Title, Text, Stack, Button, List, Collapse, Group, MantineProvider, CopyButton, Tooltip } from '@mantine/core'
import { modsInfo } from './data/mods'
import { librariesInfo } from './data/libraries'
import './App.css'
import FunnyButton from './FunnyButton'

const DOWNLOAD_URL = "https://github.com/undef-maks/winter-modpack-client/archive/refs/heads/main.zip"

export default function App() {
  const [openedIndex, setOpenedIndex] = useState(null)
  const [snowflakes, setSnowflakes] = useState([])

  const toggleCollapse = (index) => setOpenedIndex(openedIndex === index ? null : index)

  useEffect(() => {
    const flakes = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * window.innerWidth,
      size: 5 + Math.random() * 10,
      duration: 10 + Math.random() * 20,
      delay: Math.random() * 10
    }))
    setSnowflakes(flakes)
  }, [])

  return (
    <MantineProvider
      theme={{
        colorScheme: 'dark',
        colors: {
          winterBlue: ['#e0f7fa', '#b2ebf2', '#80deea', '#4dd0e1', '#26c6da', '#00bcd4', '#00acc1', '#0097a7', '#00838f', '#006064']
        },
        primaryColor: 'winterBlue',
      }}
    >
      <div className="snow-background">
        {snowflakes.map(flake => (
          <div
            key={flake.id}
            className="snowflake"
            style={{
              left: flake.left,
              fontSize: flake.size,
              animationDuration: `${flake.duration}s`,
              animationDelay: `${flake.delay}s`
            }}
          >
            ❄
          </div>
        ))}

        <Container size="sm" py="xl">
          <Title order={1} mb="md" align="center" c="winterBlue.4">
            "Майнкрафт це моє життя"
          </Title>

          <Button
            component="a"
            href={DOWNLOAD_URL}
            target="_blank"
            size="lg"
            radius="md"
            mb="xl"
            fullWidth
            gradient={{ from: 'winterBlue.5', to: 'winterBlue.7', deg: 45 }}
          >
            ⬇ Завантажити збірку
          </Button>

          <Card withBorder radius="md" mb="xl" p="md" shadow="lg"
            style={{ background: 'rgba(0, 77, 97, 0.6)', backdropFilter: 'blur(5px)', border: '2px solid #4dd0e1' }}>
            <Group position="apart">
              <Stack spacing={0}>
                <Text size="xs" transform="uppercase" weight={700} c="winterBlue.2">IP Адреса сервера:</Text>
                <Text size="xl" weight={800} c="white" style={{ letterSpacing: '1px' }}>
                  34.147.195.1:25565
                </Text>
              </Stack>

              <CopyButton value="34.39.88.182:25565" timeout={2000}>
                {({ copied, copy }) => (
                  <Tooltip label={copied ? 'Скопійовано!' : 'Копіювати IP'} withArrow position="right">
                    <Button
                      variant="light"
                      color={copied ? 'teal' : 'winterBlue'}
                      onClick={copy}
                      size="sm"
                    >
                      {copied ? '✅ Скопійовано' : '📋 Копіювати'}
                    </Button>
                  </Tooltip>
                )}
              </CopyButton>
            </Group>
          </Card>

          <Card withBorder radius="md" mb="xl" p="lg" shadow="sm">
            <Title order={3} mb="sm" c="winterBlue.3">Інструкція встановлення</Title>
            <List spacing="sm" size="sm">
              <List.Item>Встановити <b>Minecraft Forge 1.20.1</b></List.Item>
              <List.Item>Завантажити архів зі збіркою</List.Item>
              <List.Item>Розпакувати архів у папку: <code>%appdata%\\.minecraft</code></List.Item>
              <List.Item>Запустити Minecraft через Forge профіль</List.Item>
            </List>
          </Card>

          <Title order={3} mb="sm" c="winterBlue.3">Моди в збірці</Title>
          <Stack mb="xl">
            {modsInfo.map((mod, index) => (
              <Card
                key={index}
                withBorder
                shadow="md"
                radius="md"
                p="sm"
                onClick={() => toggleCollapse(index)}
                style={{ cursor: 'pointer', background: openedIndex === index ? '#004d61' : undefined }}
              >
                <Group position="apart">
                  <Text weight={500} c="winterBlue.1">{mod.title}</Text>
                  <Text size="xs" c="dimmed">{openedIndex === index ? '▲' : '▼'}</Text>
                </Group>
                <Collapse in={openedIndex === index}>
                  <Text size="sm" mt="sm" c="dimmed">{mod.description}</Text>
                  <Text size="xs" mt="sm">Version: {mod.version}</Text>
                </Collapse>
              </Card>
            ))}
          </Stack>

          <Title order={3} mb="sm" c="winterBlue.3">Бібліотеки / Dependencies</Title>
          <Stack>
            {librariesInfo.map((lib, index) => (
              <Card key={index} withBorder shadow="sm" radius="md" p="md" style={{ background: '#003c4d' }}>
                <Text weight={500} c="winterBlue.1">{lib.title}</Text>
                <Text size="sm" c="dimmed">{lib.description}</Text>
                <Text size="xs" mt="sm">Version: {lib.version}</Text>
              </Card>
            ))}
          </Stack>

          <FunnyButton />
        </Container>
      </div>
    </MantineProvider>
  )
}

