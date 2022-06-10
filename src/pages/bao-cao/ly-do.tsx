import Breadcrumb from '@/components/common/BreadCrumb';
import ContainerModal from '@/components/common/ContainerModal';
import LoadingComponent from '@/components/common/LoadingComponent';
import SelectBoxField from '@/components/common/SelectBoxField';
import LayoutCommon from '@/components/layout/LayoutCommon';
import BoxSelectType from '@/components/pages/bao-cao/BoxSelectType';
import ModalCreateReason from '@/components/pages/bao-cao/ModalCreateReason';
import ModalDeleteReason from '@/components/pages/bao-cao/ModalDeleteReason';
import ModalUpdateReason from '@/components/pages/bao-cao/ModalUpdateReason';
import Hook from '@/hooks/Report/reason.hook';
import { useReport } from '@/stores/Report';
import React from 'react';

const ReportReason = () => {
  const [stateReport, actionReport] = useReport();
  const [createModal, setCreateModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [updateModal, setUpdateModal] = React.useState(false);

  const openCreateModal = () => setCreateModal(true);
  const openUpdateModal = () => setUpdateModal(true);
  const openDeleteModal = () => setDeleteModal(true);
  const closeCreateModal = () => setCreateModal(false);
  const closeUpdateModal = () => setUpdateModal(false);
  const closeDeleteModal = () => setDeleteModal(false);

  const { handleSelectType, selectedType } = Hook.useFilterTypeReason();

  const listData = selectedType.value
    ? stateReport.reasons.list.filter(
        (item) => item.type === selectedType.value
      )
    : stateReport.reasons.list;

  React.useEffect(() => {
    (async () => {
      await actionReport.getListReasonAsync();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <LayoutCommon>
        <div className="w-full px-[10px] py-[10px]">
          <Breadcrumb
            arr_link={[
              { value: 'Dashboard', href: '/' },
              { value: 'Lý do phản ánh', href: '#!' },
            ]}
          />
          <div className="flex justify-end gap-x-[10px] mb-[10px]">
            <SelectBoxField
              id="type"
              state={selectedType.label}
              name="type"
              showLabel={false}
              overrideClassNameContainer
              classNameContainer="min-w-[200px]"
            >
              <BoxSelectType
                handleSelectType={handleSelectType}
                type={selectedType}
              />
            </SelectBoxField>
            <button className="button-orange" onClick={openCreateModal}>
              + Thêm
            </button>
          </div>
          {stateReport.reasons.loading ? (
            <LoadingComponent />
          ) : (
            <table className="w-full">
              <thead className="bg-baseColor text-white rounded-[3px]">
                <tr>
                  <th>STT</th>
                  <th>Lý do</th>
                  <th>Loại</th>
                  <th>Chi tiết</th>
                </tr>
              </thead>
              <tbody className="">
                {listData.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-100">
                    <td>{index + 1}</td>
                    <td className="">{item.title}</td>
                    <td>{item.type}</td>
                    <td className="flex items-center justify-center gap-x-[10px]">
                      <button
                        className="button-blue"
                        onClick={function () {
                          actionReport.setDetailReason(item);
                          openUpdateModal();
                        }}
                      >
                        Sửa
                      </button>
                      <button
                        className="button-red"
                        onClick={function () {
                          actionReport.setDetailReason(item);
                          openDeleteModal();
                        }}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <ContainerModal isVisible={createModal} closeModal={closeCreateModal}>
            <ModalCreateReason closeModal={closeCreateModal} />
          </ContainerModal>
          <ContainerModal isVisible={updateModal} closeModal={closeUpdateModal}>
            <ModalUpdateReason closeModal={closeUpdateModal} />
          </ContainerModal>
          <ContainerModal isVisible={deleteModal} closeModal={closeDeleteModal}>
            <ModalDeleteReason closeModal={closeDeleteModal} />
          </ContainerModal>
        </div>
      </LayoutCommon>
    </React.Fragment>
  );
};

export default ReportReason;
