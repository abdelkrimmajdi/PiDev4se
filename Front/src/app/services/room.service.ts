import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Room } from '../model/Room';
import { Message } from '../model/Message';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
 

  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost:8081/Room'; // Update with your backend base URL

  // Room methods

  createChatRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(`${this.baseUrl}/createRoom`, room);
  }

  getChatById(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.baseUrl}/getRoomById/${id}`);
  }

  getAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.baseUrl}/getAllRooms`);
  }

  updateRoom(id: number, room: Room): Observable<Room> {
    return this.http.put<Room>(`${this.baseUrl}/updateRoom/${id}`, room);
  }

  deleteRoom(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteRoom/${id}`);
  }

  // Message methods

  addMessageToChatRoom(message: Message): Observable<Message> {
    return this.http.post<Message>(`${this.baseUrl}/createMessage/create`, message);
  }

  getMessageById(id: number): Observable<Message> {
    return this.http.get<Message>(`${this.baseUrl}/getMessageById/${id}`);
  }

  getAllMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.baseUrl}/getAllMessages/all`);
  }

  updateMessage(id: number, message: Message): Observable<Message> {
    return this.http.put<Message>(`${this.baseUrl}/updateMessage/${id}`, message);
  }

  deleteMessage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteMessage/${id}`);
  }

  getAllMessagesFromChatId(idRoom: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.baseUrl}/getAllMessagesInChat/${idRoom}`);
  }
  getAllMessagesByChatId(idRoom: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.baseUrl}/getAllMessagesFromChat/${idRoom}`);
  }

  // User methods

  getUserByFirstName(firstName: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/getbyfirstname/${firstName}`);
  }

  // Additional methods

  getChatByFirstUserName(firstName: string): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.baseUrl}/getChatByFirstUserName/${firstName}`);
  }

  getChatBySecondUserName(firstName: string): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.baseUrl}/getChatBySecondUserName/${firstName}`);
  }

  getChatByFirstUserNameOrSecondUserName(firstName: string): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.baseUrl}/getChatByFirstUserNameOrSecondUserName/${firstName}`);
  }

  getChatByFirstUserNameAndSecondUserName(firstFirstName: string, secondFirstName: string): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.baseUrl}/getChatByFirstUserNameAndSecondUserName/${firstFirstName}/${secondFirstName}`);
  }

  updateChat(message: Message, idRoom: number): Observable<Room> {
    return this.http.post<Room>(`${this.baseUrl}/addMessageToRoom/${idRoom}`, message);
  }

}
