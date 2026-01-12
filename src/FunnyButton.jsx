import { useState } from 'react'
import { Container, Button, Title } from '@mantine/core'

export default function FunnyButton() {
  const [position, setPosition] = useState({ top: 200, left: 200 })

  const moveButton = () => {
    const newTop = Math.random() * 300
    const newLeft = Math.random() * 300
    setPosition({ top: newTop, left: newLeft })
  }

  return (
    <Container size="sm" style={{ height: 400, position: 'relative', marginTop: 50 }}>
      <Title order={2} mb="md" align="center" c="white">
      </Title>

      <Button
        onMouseEnter={moveButton}
        style={{
          position: 'absolute',
          top: position.top,
          left: position.left,
          transition: 'top 0.2s, left 0.2s',
        }}
        color="red"
      >
        Постав лайк якщо не гей
      </Button>
    </Container>
  )
}

