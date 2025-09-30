import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout'
import { HomePage } from '../pages/Home'
import { EstatisticasPage } from '../pages/Estatisticas'
import { DDDPage } from '../pages/DDD'
import { BauPage } from '../pages/Bau'
import { PomodoroPage } from '../pages/Pomodoro'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'estatisticas', element: <EstatisticasPage /> },
      { path: 'ddd', element: <DDDPage /> },
      { path: 'bau', element: <BauPage /> },
      { path: 'pomodoro', element: <PomodoroPage /> },
    ],
  },
])

