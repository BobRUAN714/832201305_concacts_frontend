import request from '@/utils/request';

export function listAddressBook() {
  return request({
    url: '/addressBook/list',
    method: 'get'
  });
}

export function getAddressBook(id) {
  return request({
    url: `/addressBook/${id}`,
    method: 'get'
  });
}

export function addAddressBook(data) {
  return request({
    url: '/addressBook',
    method: 'post',
    data: data
  });
}

export function updateAddressBook(data) {
  return request({
    url: '/addressBook',
    method: 'put',
    data: data
  });
}

export function deleteAddressBook(id) {
  return request({
    url: `/addressBook/${id}`,
    method: 'delete'
  });
}
