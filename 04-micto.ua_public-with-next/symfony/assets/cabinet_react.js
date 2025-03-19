import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CabinetLayout from './react/controllers/layouts/CabinetLayout';
import Cabinet from './react/controllers/page/cabinet';
import InstitutionList from './react/controllers/page/cabinet/InstitutionList';
import Personal from './react/controllers/page/cabinet/Personal';
import Settings from './react/controllers/page/cabinet/Settings';

import Institution from '@/controllers/page/cabinet/Institution';
import InstitutionEdit from '@/controllers/page/cabinet/InstitutionEdit/InstitutionEdit';
import { Provider } from 'react-redux';
import Comments from './react/controllers/page/cabinet/Comments';
import CommentEdit from './react/controllers/page/cabinet/CommentEdit';
import ChangePass from './react/controllers/page/cabinet/ChangePass';
import ChangeEmail from './react/controllers/page/cabinet/ChangeEmail';
import DepartmentEdit from './react/controllers/page/cabinet/DepartmentEdit';
import { store } from './react/reduxToolkit/store';

ReactDOM.createRoot(document.getElementById('cabinet-root')).render(
	<Provider store={store}>
		<BrowserRouter>
			<Routes>
				<Route path="/cabinet" element={<CabinetLayout />}>
					<Route index element={<Cabinet />} />

					<Route path="personal" element={<Personal />} />
					<Route path="settings" element={<Settings />} />

					<Route path="comments/:institutionId" element={<Comments />} />
					<Route path="comment/:id" element={<CommentEdit />} />
					<Route path="change-pass" element={<ChangePass />} />
					<Route path="change-email" element={<ChangeEmail />} />

					<Route path="institution/:institutionId">
						<Route path="unit/list" element={<InstitutionList />} />
						<Route path="unit/create" element={<InstitutionEdit createMode={true} />} />
						<Route path="unit/:unitId">
							<Route path="edit" element={<InstitutionEdit />} />

							<Route path="department/:departmentId">
								<Route path="edit" element={<DepartmentEdit />} />
							</Route>
							<Route
								path="department/create"
								element={<DepartmentEdit createMode={true} />}
							/>
						</Route>

						<Route path="info" element={<Institution />} />
					</Route>

					{/* <Route path="*" element={<NotFoundPage />} /> */}
				</Route>
			</Routes>
		</BrowserRouter>
	</Provider>
);
