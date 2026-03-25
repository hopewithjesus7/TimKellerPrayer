/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import PrayerRoutine from "./pages/PrayerRoutine";
import CalvinPrayers from "./pages/CalvinPrayers";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="routine" element={<PrayerRoutine />} />
          <Route path="calvin" element={<CalvinPrayers />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
